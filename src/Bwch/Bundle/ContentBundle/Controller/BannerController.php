<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class BannerController extends Controller
{
    public function randomBannerAction()
    {
        $buzz = $this->container->get('buzz');
        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'banners/random/250/1');
            $banners = json_decode($response->getContent());
        } catch (Exception $e) {
        }

        if (empty($banners)) {
            $banners[0] = array('htmlcode' => "<a><img alt='' src='/images/shared/temp_home_right_column_banner.jpg'></a>",) ;
        }

        return $this->render(
            'BwchContentBundle:Banner:randomBanner.html.twig',
            array('banners' => $banners)
        );
    }

    public function fiveBannersAction()
        {
            $buzz = $this->container->get('buzz');
            try {
                $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'banners/random/60/5');
                $banners = json_decode($response->getContent());
            } catch (Exception $e) {
            }

            if (empty($banners)) {
                $banners[0] = array('htmlcode' => "<a><img alt='' src='/images/shared/temp_home_right_column_banner.jpg'></a>",) ;
            }

//            $banner = empty($banners) ? array(
//                'htmlcode' => "<a><img alt='' src='/images/shared/temp_home_right_column_banner.jpg'></a>",
//            ) : $banners[0];

        return $this->render(
            'BwchContentBundle:Banner:randomBanner.html.twig',
                array('banners' => $banners)
        );
    }
}