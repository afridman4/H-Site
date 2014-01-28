<?php

namespace Bwch\Bundle\AjaxBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Bwch\Bundle\ContentBundle\Entity\User;


class DefaultController extends Controller
{
    static protected function send($responseData = '')
    {
        $response = new Response(json_encode($responseData));
        $response->headers->set('Content-Type', 'application/json');

        return $response;

    }

    private function checkRequest()
    {
        $request = Request::createFromGlobals();

        if(!$request->isXmlHttpRequest()){
            throw new NotFoundHttpException("Page not found");
        }

        return true;

    }

    private function sendResponse($responseData)
    {
        $response = array(
            'status' => true,
            'data' => $responseData,
        );

        return self::send($response);

    }

    private function sendErrors($errorsData = 'empty error')
    {
        $response = array(
            'status' => false,
            'errors' => $errorsData,
        );

        return self::send($response);

    }

    public function getHTypesAction()
    {
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htypes');
        $htypes = json_decode($response->getContent());

        $result = array(
            'data' => $htypes,
            'total' => count($htypes),
        );

        return self::sendResponse($result);

    }

    public function saveHTypeAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        // Убираем дату и ID. Пусть их сохранаяет серверная часть.
        unset($parameters['created'], $parameters['_id']);

        $buzz = $this->container->get('buzz');

        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'savehtype', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array($parameters),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeHTypeAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $name = @$parameters['name'];

        if (empty($name)) {
            return self::sendErrors('HType name not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removehtype/' . rawurlencode($name));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getProvidersAction()
    {
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'providers');
        $providers = json_decode($response->getContent());

        $result = array(
            'data' => $providers,
            'total' => count($providers),
        );

        return self::sendResponse($result);

    }

    public function saveProviderAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveprovider', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeProviderAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];

        if (empty($provider)) {
            return self::sendErrors('Provider name not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removeprovider/' . rawurlencode($provider));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getFeaturesAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $htype = @$parameters['htype'];

        if (empty($htype)) {
            return self::sendErrors('HTypes not set');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'features/' . rawurlencode($htype));
        $features = json_decode($response->getContent(), true);

        $result = array(
            'data' => $features,
            'total' => count($features),
        );

        return self::sendResponse($result);

    }

    public function saveFeatureAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'savefeature', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeFeatureAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $htype = @$parameters['htype'];
        $name = @$parameters['name'];

        if (empty($htype) || empty($name)) {
            return self::sendErrors('HType or Feature not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removeFeature/' . rawurlencode($htype) . "/" . rawurlencode($name));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getPlansAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $htype = @$parameters['htype'];

        if (empty($provider)) {
            return self::sendErrors('Provider not set');
        }

        $criteria = array(
            'provider' => $provider,
        );

        if (!empty($htype)) {
            $criteria['htype'] = $htype;
        }

        $criteria = json_encode($criteria);

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria));
        $plans = json_decode($response->getContent());

        $result = array(
            'data' => $plans,
            'total' => count($plans),
        );

        return self::sendResponse($result);

    }

    public function getPlansByHTypeAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $htype = @$parameters['htype'];

        if (empty($provider) || empty($htype)) {
            return self::sendErrors('Provider or HTYpe not set');
        }

        $criteria = array(
            'htype' => $htype,
            'provider' => $provider,
        );
        $criteria = json_encode($criteria);

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/search/' . rawurlencode($criteria));
        $plans = json_decode($response->getContent());

        $result = array(
            'data' => $plans,
            'total' => count($plans),
        );

        return self::sendResponse($result);

    }

    public function savePlanAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveplan', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removePlanAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Privder or Plan not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removePlan/' . rawurlencode($provider) . "/" . rawurlencode($planname));

        $result = array(
            'data' => array($response->getHeaders()),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getBannersAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'banners/20');
        $banners = json_decode($response->getContent());

        $result = array(
            'data' => $banners,
            'total' => count($banners),
        );

        return self::sendResponse($result);

    }

    public function saveBannerAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        // Убираем ID. Пусть их сохраняет серверная часть.
        unset($parameters['_id']);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'savebanner', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeBannerAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $_id = @$parameters['_id'];

        if (empty($_id)) {
            return self::sendErrors('Banner _id not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removebanner/' . $_id);

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getReviewsAction()
    {
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'reviews');
        $reviews = json_decode($response->getContent());

        $result = array(
            'data' => $reviews,
            'total' => count($reviews),
        );

        return self::sendResponse($result);

    }

    public function saveReviewAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'savereview', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeReviewAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $_id = @$parameters['_id'];

        if (empty($_id)) {
            return self::sendErrors('Review _id not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removereview/' . $_id);

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function getPlanFeaturesAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Provider or Planname not set');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
        $plans = json_decode($response->getContent());

        if (empty($plans)) {
            return self::sendErrors('Plan not found.');
        }
        // Уберем из результата все свойства плана.
        $planfields = $this->container->getParameter('bwch.planfields');
        $planfields = array_fill_keys($planfields, 0);
        $plan = (array) $plans[0];
        $features = array_diff_key($plan, $planfields);
        $features = array_map(create_function('$name, $value', 'return array("name" => $name, "value" => $value);'), array_keys($features), array_values($features));

        $result = array(
            'data' => $features,
            'total' => count($features),
        );

        return self::sendResponse($result);

    }

    public function getPlanDetailFeaturesAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Provider or Planname not set');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
        $plans = json_decode($response->getContent());

        if (empty($plans)) {
            return self::sendErrors('Plan not found.');
        }
        // Уберем из результата все свойства плана.
        $planfields = $this->container->getParameter('bwch.planfields');
        $planfields = array_fill_keys($planfields, 0);
        $plan = (array) $plans[0];
        $features = array_diff_key($plan, $planfields);
        $features = array_map(create_function('$name, $value', 'return array("name" => $name, "value" => $value);'), array_keys($features), array_values($features));

        $htype = @$parameters['htype'];

        if (empty($htype)) {
            return self::sendErrors('HTypes not set');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'features/' . rawurlencode($htype));
        $htypeFeatures = json_decode($response->getContent(), true);

        for($f=0; $f<count($features); $f++) {
            for($h=0; $h<count($htypeFeatures); $h++) {
                if ($features[$f]['name'] == $htypeFeatures[$h]['name']) {
                    $features[$f]['displayname'] = isset($htypeFeatures[$h]['displayname']) ? $htypeFeatures[$h]['displayname'] : $htypeFeatures[$h]['name'];
                    $features[$f]['description'] = isset($htypeFeatures[$h]['description']) ? $htypeFeatures[$h]['description'] : '';
                    $features[$f]['type'] = $htypeFeatures[$h]['type'];
                    $features[$f]['unit'] = $htypeFeatures[$h]['unit'];
                }
            }
        }

        $result = array(
            'data' => $features,
            'total' => count($features),
        );

        return self::sendResponse($result);

    }

    public function getPlanPricesAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Provider or Planname not set');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
        $plans = json_decode($response->getContent());

        if (empty($plans)) {
            return self::sendErrors('Plan not found.');
        }

        // Возьмем только Prices
        $plan = (array) $plans[0];
        $prices = @$plan['prices'];

        $result = array(
            'data' => $prices,
            'total' => count($prices),
        );

        return self::sendResponse($result);

    }

    public function savePlanPricesAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];
        $prices = @$parameters['prices'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Provider or Planname not set');
        }

        // Найдем весь план и подменим ему prices
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
        $plans = json_decode($response->getContent());

        if (empty($plans)) {
            return self::sendErrors('Plan not found.');
        }

        // Подменим ему prices
        $plan = (array) $plans[0];
        $plan['prices'] = $prices;
        unset($plan["_id"]);

        // И сохраним
        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveplan', array("Content-Type: application/json"), json_encode($plan));

        $result = array(
            'data' => array(),
            'total' => 0,
        );

        return self::sendResponse($result);

    }

    public function savePlanFeaturesAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $provider = @$parameters['provider'];
        $planname = @$parameters['planname'];
        $features = @$parameters['features'];

        if (empty($provider) || empty($planname)) {
            return self::sendErrors('Provider or Planname not set');
        }

        // Найдем весь план
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plan/' . rawurlencode($provider) . '/' . rawurlencode($planname));
        $plans = json_decode($response->getContent());

        if (empty($plans)) {
            return self::sendErrors('Plan not found.');
        }

        // Удалим из плана все Features, оставив только базовые свойства плана
        $plan = (array) $plans[0];
        $planfields = $this->container->getParameter('bwch.planfields');
        $planfields = array_fill_keys($planfields, 0);
        $plan = array_intersect_key($plan, $planfields);

        // Features прилетают к нам в виде feature[0]['name'] = value,
        // а нам надо переделать их в вид plan[name] = value и подменить уже существующие значения
        for($idx = 0; $idx < count($features); $idx++) {
            $plan[$features[$idx]['name']] = $features[$idx]['value'];
        }
        unset($plan["_id"]);

        // И сохраним
        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveplan', array("Content-Type: application/json"), json_encode($plan));

        $result = array(
            'data' => array(),
            'total' => 0,
        );

        return self::sendResponse($result);

    }

    public function getUsersAction()
    {
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'users/search/' . rawurlencode(json_encode(array())));
        $users = json_decode($response->getContent());

        $result = array(
            'data' => $users,
            'total' => count($users),
        );

        return self::sendResponse($result);

    }

    public function saveUserAction(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveuser', array("Content-Type: application/json"), json_encode($parameters));

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function removeUserAction()
    {
        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $login = @$parameters['login'];

        if (empty($login)) {
            return self::sendErrors('User login not specified.');
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->delete($this->container->getParameter('bwch.server_url') . 'removeuser/' . $login);

        $result = array(
            'data' => array(),
            'total' => 0,
        );
        return self::sendResponse($result);
    }

    public function updateUserAction()
    {

        $request = Request::createFromGlobals();
        $parameters = $request->request->all();
        $name = @$parameters['name_input___user_name'];
        $email = @$parameters['name_input___user_email_address'];
        $oldPassword = @$parameters['name_input___user_old_password'];
        $newPassword = @$parameters['name_input___user_new_password'];

        $user = $this->getUser();

        if (empty($user)) {
            return self::sendErrors('User not logged on.');
        }

        $userEntity = array(
            'name' => $user->getUsername(),
            'email' => $user->getEmail(),
            'login' => $user->getLogin(),
            'phone' => $user->getPhone(),
            'password' => $user->getPassword(),
            'salt' => $user->getSalt(),
            'registration' => $user->getRegistrationDate(),
            'role' => $user->getRole(),
        );

        if (isset($name)) {
            $userEntity['name'] = $name;

            $result = array(
                'integer___status' => 0,
                'varchar___status' => 'success',
                'string_text___status_description' => 'Username updated successfully',
                'object___result' => array(
                    'object_string___modified_field'=>
                        array(
                            'name_input___user_name' => $name
                        )
                )
            );

        }

        if (isset($email)) {
            $userEntity['email'] = $email;

            $result = array(
                'integer___status' => 0,
                'varchar___status' => 'success',
                'string_text___status_description' => 'Email updated successfully',
                'object___result' => array(
                    'object_string___modified_field'=>
                        array(
                            'name_input___user_email_address' => $email
                        )
                )
            );

        }

        if (isset($oldPassword) && isset($newPassword)) {
            $factory = $this->get('security.encoder_factory');
            $encoder = $factory->getEncoder($user);
            $currentPassword = $encoder->encodePassword($oldPassword, $user->getSalt());

            if ($currentPassword != $userEntity['password']) {
                $result = array(
                    'integer___status' => -1,
                    'varchar___status' => 'error',
                    'string_text___status_description' => 'Current password is invalid',
                    'object___result' => array(
                        'object_string___field_error_description'=>
                            array(
                                'name_input___user_old_password' => 'This field contain error!'
                            )
                    )
                );

                return self::send($result);

            } else {
                $userEntity['password'] = $encoder->encodePassword($newPassword, $user->getSalt());

                $result = array(
                    'integer___status' => 0,
                    'varchar___status' => 'success',
                    'string_text___status_description' => 'Password updated successfully',
                    'object___result' => array(
                        'object_string___modified_field'=>
                            array(
                                'name_input___user_old_password' => ''
                            )
                    )
                );
            }
        }

        $buzz = $this->container->get('buzz');
        $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveuser', array("Content-Type: application/json"), json_encode($userEntity));

        return self::send($result);

    }


}
