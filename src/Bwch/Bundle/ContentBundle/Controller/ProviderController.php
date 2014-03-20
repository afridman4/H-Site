<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class ProviderController extends Controller
{
    public function detailsAction($provider = '')
    {
        $plan = $features = array();

        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'provider/' . rawurlencode($provider));
            $providerDetails = json_decode($response->getContent());
            $providerDetails = (array) $providerDetails[0];
            if (!empty($providerDetails['ratings']) && is_array($providerDetails['ratings']))
                foreach($providerDetails['ratings'] as $poviderRating) {
                    $providerDetails['ratings'][$poviderRating->name] = $poviderRating->rate;
                }
            else {
                $reviewRatings = $this->container->getParameter('bwch.review_ratings');
                $providerDetails['ratings'] = array();
                for($i=0; $i<count($reviewRatings); $i++)
                    $providerDetails['ratings'][$reviewRatings[$i]] = 0;
            }

        } catch (Exception $e) {
        }

        return $this->render(
            'BwchContentBundle:Provider:details.html.twig',
            array('provider' => $providerDetails)
        );
    }

    public function ratingAction($provider = '', $planname = '')
    {
        return $this->render(
            'BwchContentBundle:Plan:rating.html.twig'
        );
    }

    public function searchWebAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        $criteria = array();
        // Подключим HType
        $htype = $criteria['htype'] = $parameters['htype'];

        // Пройдемся по всем параметрам, уберем все кроме цифр и создадим строку для поиска
        foreach($parameters as $name => $value) {
            if (preg_match('/^(.*?)_.*/i', $name, $type)) {
                // Узнаем тип feature
                $type = $type[1];

                // Уберем из имени тип
                $name = preg_replace('/^' . $type . '_/', '', $name);
                // и HType
                $name = preg_replace('/^' . $htype . '_/', '', $name);

                // Уберем из значения все лишнее
                $v = preg_replace('/[^0-9]/', '', $value);
                $parameters[$name] = $v;

                if ($v) {
                    // В зависимости от типа составим запрос
                    switch ($type) {
                        case 'int':
                            $criteria[$name] = array(
                                '$gte' => $v,
                            );
                            break;
                        case 'yesno':
                            $criteria[$name] = array(
                                '$exists' => $v == 1,
                            );
                            break;
                    }
                }
            }
        }

        // Найдем все планы по собранному в JSON query
        $criteria = json_encode($criteria);
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria));
            $plans = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $plans = array();
        }

        // Возьмем детали HType
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htype/' . rawurlencode($htype));
            $htypes = json_decode($response->getContent(), true);
            $htype = $htypes[0];
        } catch (Exception $e) {
            $htype = array();
        }

        $parameters['criteria'] = rawurlencode($criteria);

        return $this->render(
            'BwchContentBundle:Feature:searchWebResult.html.twig',
            array(
                'parameters' => $parameters,
                'plans' => $plans,
                'htype' => $htype,
                'url' => $this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria))
        );
    }

    public function searchPlansAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        $criteria = array();
        $buzz = $this->container->get('buzz');

// DEBUG
// ('htype' => 'WEB',
//          'int_WEB_bandwidth' => '2 Gb',
//          'int_WEB_diskspace' => '6 Gb',
//          'int_WEB_domainsallowed' => '0',
//          'int_WEB_freedomains' => '0',
//          'int_WEB_ipaddresses' => '0',
//          'int_WEB_numberdatabases' => '0',
//          'yesno_WEB_tollfreenumber' => '1'),
//
//        $str = implode('X', $parameters);
//
//            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($str));
//            $htypes = json_decode($response->getContent());
//            $htype = (array) $htypes[0];
//            $htype = $htype['name'];
// END DEBUG


        // Подключим HType
        $htype = $criteria['htype'] = @$parameters['htype'];

        if (empty($htype)) {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htypes');
            $htypes = json_decode($response->getContent());
            $htype = (array) $htypes[0];
            $htype = $htype['name'];
        }

        // Пройдемся по всем параметрам, уберем все кроме цифр и создадим строку для поиска
        foreach($parameters as $name => $value) {
            $inti = 0;
            if (preg_match('/^(.*?)_.*/i', $name, $type)) {
                // Узнаем тип feature
                $type = $type[1];

                // Уберем из имени тип
                $name = preg_replace('/^' . $type . '_/', '', $name);
                // и HType
                $name = preg_replace('/^' . $htype . '_/', '', $name);

                // Уберем из значения все лишнее
                if ($type == 'int') {
                    $v = preg_replace('/[^0-9\.]/', '', $value);
                    $parameters[$name] = $v;

                    // Проверим на наличие UNLIMITED в исходном параметре
                    if (preg_match('/^UNLIMITED/i', $value, $unlimited))
                        $v = -1;
                } else {
                    $v = $value;
                }

                if ($v) {
                    // В зависимости от типа составим запрос
                    switch ($type) {
                        case 'int':
                            // Если было указано значение, то возьмем и его и UNLIMITED
                            if ($v > 0) {
//                                $orindex = '$or'.$inti;
//                                $inti = $inti+1;
                                $criteria['ZZ'.$name.'YY'] = array(
                                    array(
                                        $name => array(
                                            '$gte' => floatval($v),
                                        ),
                                    ),
                                    array(
                                        $name => "UNLIMITED",
                                    ),
                                    array(
                                        $name => "UNSPECIFIED",
                                    ),
                                );
                            } else
                                // В противном случае только UNLIMITED
                                $criteria[$name] =  "UNLIMITED";

                            break;
                        case 'multiple':
                            $multiple[$name] = $v;

                            break;
                        case 'yesno':
                            $criteria[$name] = array(
                                '$exists' => $v == 1,
                            );
                            break;
                    }
                }
            }
        }

        if (!empty($multiple))
            foreach ($multiple as $name => $values)
                $criteria[$name] = array(
                    '$all' => $values,
                );

        // Найдем все планы по собранному в JSON query
        $criteria = json_encode($criteria);
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria));
            $plans = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $plans = array();
        }

        // Возьмем детали HType
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htype/' . rawurlencode($htype));
            $htypes = json_decode($response->getContent(), true);
            $htype = $htypes[0];
        } catch (Exception $e) {
            $htype = array();
        }

        // Подобъем итоги
        $maxPrice = $minPrice = 0;
        for($i=0; $i<count($plans); $i++) {
            // Прикрепим провайдера
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'provider/' . rawurlencode($plans[$i]['provider']));
            $providers = json_decode($response->getContent(), true);
            $plans[$i]['providerDetails'] = $providers[0];

            $advPrice = @$plans[$i]['advprice'];
            if (!$i)
                $maxPrice = $minPrice = $advPrice;
            else {
                $maxPrice = max($maxPrice, $advPrice);
                $minPrice = min($minPrice, $advPrice);
            }
        }

        // Данные для пагинации на стороне клиента
        $pageSize = $this->container->getParameter('bwch.paginator_page_size');
        $plansCount = count($plans);
        $pagesCount = ceil($plansCount / $pageSize);

        $parameters['criteria'] = rawurlencode($criteria);

        return $this->render(
            'BwchContentBundle:Feature:searchResult.html.twig',
            array(
                'parameters' => $parameters,
                'plans' => $plans,
                'plansCount' => $plansCount,
                'pageSize' => $pageSize,
                'pagesCount' => $pagesCount,
                'htype' => $htype,
                'minPrice' => $minPrice,
                'maxPrice' => $maxPrice,
                'url' => $this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria),
            )
        );
    }

    public function searchPopularPlansAction($htype)
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        $criteria = array(
            'htype' => $htype,
        );

        // Найдем все планы по собранному в JSON query
        $criteria = json_encode($criteria);
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria));
            $plans = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $plans = array();
        }

        // Возьмем детали HType
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htype/' . rawurlencode($htype));
            $htypes = json_decode($response->getContent(), true);
            $htype = $htypes[0];
        } catch (Exception $e) {
            $htype = array();
        }

        return $this->render(
            'BwchContentBundle:Feature:webResult.html.twig',
            array(
                'parameters' => $parameters,
                'plans' => $plans,
                'htype' => $htype,
                'url' => $this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria))
        );
    }

    public function subscribeAction($provider = '')
    {
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'provider/' . rawurlencode($provider));
            $provider = json_decode($response->getContent());
            $provider = @$provider[0];

        } catch (Exception $e) {
            $provider = array();
        }

        return $this->render(
            'BwchContentBundle:Plan:subscribe.html.twig',
            array('provider' => $provider)
        );
    }


    public function searchBestPlansAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        // Найдем все планы без критериев
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'bestplans/10');
            $plans = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $plans = array();
        }

        return $this->render(
            'BwchContentBundle:Feature:bestResult.html.twig',
            array(
                'parameters' => $parameters,
                'plans' => $plans
            )
        );
    }

    public function comparePlansAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'features/' . $parameters['htype']);
            $features = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $features = array();
        }

        $plans = array();
        $selectedPlans = @$parameters['selectedPlans'];
        for($i=0; $i<count($selectedPlans); $i++) {
            list($provider, $planname) = explode('_', $selectedPlans[$i]);

            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
            $planDetails = json_decode($response->getContent());
            $plans[] = $planDetails[0];
        }

        return $this->render(
            'BwchContentBundle:Plan:compare.html.twig',
            array(
                'features' => $features,
                'plans' => $plans,
            )
        );
    }

    public function calculationAction($provider = '', $planname = '')
    {
        $buzz = $this->container->get('buzz');
        $serverURL = $this->container->getParameter('bwch.server_url');

        // Выбираем все HTypes
        $response = $buzz->get($serverURL . 'htypes');
        $htypes = json_decode($response->getContent(), true);

        // Выбираем всех Providers
        $response = $buzz->get($serverURL . 'providers');
        $providers = json_decode($response->getContent());

        // Если пришел Provider, выбираем все его Plans
        if (!empty($provider)) {
            $response = $buzz->get($serverURL . 'plans/' . rawurlencode($provider));
            $plans = json_decode($response->getContent());
        } else
            $plans = array();

        // Если пришел Planname, выбираем сразу все его детали
        if (!empty($planname)) {
            $response = $buzz->get($serverURL . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
            $planDetails = json_decode($response->getContent());
            $planDetails = (array) $planDetails[0];

            for($i=0; $i<count($htypes); $i++) {
                if ($htypes[$i]['name'] == $planDetails['htype']) {
                    $htype = $htypes[$i];
                    break;
                }
            }
            $prices = (array) $planDetails['prices'];

            $planfields = $this->container->getParameter('bwch.planfields');
            $planfields = array_fill_keys($planfields, 0);
            $features = array_diff_key($planDetails, $planfields);
            $features = array_map(create_function('$name, $value', 'return array("name" => $name, "value" => $value);'), array_keys($features), array_values($features));

            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'features/' . rawurlencode($htype['name']));
            $htypeFeatures = json_decode($response->getContent(), true);

            foreach($features as $idx => $feature) {
                for($i=0; $i<count($htypeFeatures); $i++) {
                    if ($htypeFeatures[$i]['name'] == $features[$idx]['name']) {
                        $features[$idx]['displayname'] = $htypeFeatures[$i]['displayname'];
                        $features[$idx]['type'] = $htypeFeatures[$i]['type'];
                        $features[$idx]['unit'] = $htypeFeatures[$i]['unit'];
                    }
                }
            }


        } else {
            $prices = array();
            $features = array();
            $htype = array();
        }

        return $this->render(
            'BwchContentBundle:Plan:calculation.html.twig',
            array(
                'htypes' => $htypes,
                'htype' => $htype,
                'providers' => $providers,
                'provider' => $provider,
                'plans' => $plans,
                'planname' => $planname,
                'prices' => $prices,
                'features' => $features,
            )
        );
    }


}