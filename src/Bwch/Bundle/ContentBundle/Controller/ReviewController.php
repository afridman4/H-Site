<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Bwch\Bundle\ContentBundle\Entity\Review;
use Bwch\Bundle\ContentBundle\Form\Type\ReviewType;
use Symfony\Component\Security\Core\SecurityContext;

class ReviewController extends Controller
{
    public function recentReviewsAction($max = 5, $currentRoute = '/', $planname = false, $provider = false)
    {
        $buzz = $this->container->get('buzz');

        if (empty($provider) && empty($planname))
            $url = 'short/recent/' . $max;
        else if (empty($planname))
            $url = rawurlencode($provider);
        else
            $url = rawurlencode($provider) . '/' . rawurlencode($planname) . '/';


        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'reviews/' . $url);
            $reviews = json_decode($response->getContent());
        } catch (Exception $e) {
            $reviews = array();
        }

        return $this->render(
            'BwchContentBundle:Review:recentList.html.twig',
            array('reviews' => $reviews, 'currentRoute' => $currentRoute, 'planname' => $planname, 'provider' => $provider)
        );
    }

    public function recentUserReviewsAction($max = 5, $currentRoute = '/', $planname = false, $provider = false)
    {
        $buzz = $this->container->get('buzz');

        $user = $this->getUser();

        $url = 'short/recent/' . rawurlencode($user->getUsername()) . '/' . $max;

        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'reviews/' . $url);
            $reviews = json_decode($response->getContent());
        } catch (Exception $e) {
            $reviews = array();
        }

        return $this->render(
            'BwchContentBundle:Review:recentUserList.html.twig',
            array(
                'reviews' => $reviews,
                'currentRoute' => $currentRoute,
                'planname' => $planname,
                'provider' => $provider,
            )
        );
    }

    public function submitFormAction(Request $request, $provider = '', $planname = '')
    {
        //$provider = "Hostgator";
        //$planname = "Plan name";

        // Если не указан провайдер, возьмем всех что есть.
        if (empty($provider)) {
            $buzz = $this->container->get('buzz');
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'providers');
            $provider = json_decode($response->getContent());
        } elseif (empty($planname)) {
            // Если указан провайдер, но не указан план, подтянем все его планы
            $buzz = $this->container->get('buzz');
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'plans/' . rawurlencode($provider));
            $planname = json_decode($response->getContent());
        }

        $review = new Review();

        $loggedUsername = $this->get('security.context')->getToken()->getUsername();
        $review->setAuthor($loggedUsername == 'anon.' ? 'Anonymous' : $loggedUsername);

        $review->setProvider(gettype($provider) == 'string' ? $provider : 'Please select...');
        $review->setPlan(gettype($planname) == 'string' ? $planname : 'Please select...');

        $form = $this->createForm(new ReviewType(), $review);

        $form->handleRequest($request);

        if ($form->isValid()) {

            $review->setTime(time());

            // Основные параметры отзыва
            $reviewEntity = array(
                'author' => $review->getAuthor(),
                'provider' => $review->getProvider(),
                'plan' => $review->getPlan() == 'Please select...' ? '' : $review->getPlan(),
                'time' => $review->getMongoTime(),
                'text' => $review->getText(),
                'generalratings' => $review->getRatingGeneralRatings(),
                'ratings' => array(
                    array(
                        'name' => 'service',
                        'rate' => $review->getRatingService(),
                    ),
                    array(
                        'name' => 'reliability',
                        'rate' => $review->getRatingReliability(),
                    ),
                    array(
                        'name' => 'performance',
                        'rate' => $review->getRatingPerformance(),
                    ),
                    array(
                        'name' => 'ease of use',
                        'rate' => $review->getRatingEaseOfUse(),
                    ),
                    array(
                        'name' => 'feature set',
                        'rate' => $review->getRatingFeatureSet(),
                    ),
                ),
                'usedfrom' => $review->getUsedDateFrom(),
                'usedto' => $review->getUsedDateTo(),
                'stilluseit' => $review->getStillUseIt(),
            );

            $buzz = $this->container->get('buzz');
            $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'savereview', array("Content-Type: application/json"), json_encode($reviewEntity, JSON_NUMERIC_CHECK));

            return $this->render(
                'BwchContentBundle:Review:submitSuccess.html.twig');
        }

        return $this->render(
            'BwchContentBundle:Review:submitForm.html.twig',
            array('planname' => $planname, 'provider' => $provider, 'form' => $form->createView())
        );
    }

    public function viewReviewAction($id = '')
    {
        $buzz = $this->container->get('buzz');

        try {
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'review/' . $id);
            $review = json_decode($response->getContent());
            $review = (array) $review;

            if (!empty($review['ratings']) && is_array($review['ratings']))
                foreach($review['ratings'] as $reviewRating) {
                    $review['ratings'][$reviewRating->name] = $reviewRating->rate;
                }

        } catch (Exception $e) {
            $review = array();
        }


        return $this->render(
            'BwchContentBundle:Review:viewReview.html.twig',
            array(
                'review' => $review,
            )
        );
    }

}