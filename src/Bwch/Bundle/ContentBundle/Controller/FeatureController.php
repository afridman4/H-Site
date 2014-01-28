<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class FeatureController extends Controller
{
    public function searchFormAction($currentRoute = 'bwch_index', $parameters = array(), $htype = 'search_features')
    {
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'features/' . $htype);
            $features = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $features = array();
        }

/*        $searchForm = $this->createFormBuilder();
        foreach($features as $feature) {
            // TODO После того, как можно будет отображать списки и чекбоксы - изменять тип. Сейчас просто text
            $searchForm->add($feature['name'], 'text', array(
                    'label' => $feature['displayname'],
                    'data' => $feature['defaultvalue'],
                ));
        }

        $searchForm->getForm();
        $searchForm->handleRequest($request);

        if ($searchForm->isValid()) {
            $data = $searchForm->getData();
            return $this->render(
                'BwchContentBundle:Feature:searchResult.html.twig',
                array('parameters' => $data)
            );
        }*/

        return $this->render(
            'BwchContentBundle:Feature:searchForm.html.twig',
            array(
                'searchFeatures' => $features,
                'currentRoute' => $currentRoute,
                'parameters' => $parameters,
                'htype' => $htype,
            )
        );
    }

}