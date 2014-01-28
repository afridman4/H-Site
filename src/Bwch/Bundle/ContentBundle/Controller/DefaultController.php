<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        // Получим из БД все HTypes
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'htypes');
            $htypes = json_decode($response->getContent(), true);
        } catch (Exception $e) {
            $htypes = array();
        }

        return $this->render(
            'BwchContentBundle::index.html.twig',
            array('htypes' => $htypes)
        );

    }

}
