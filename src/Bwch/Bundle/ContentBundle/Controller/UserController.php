<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Bwch\Bundle\ContentBundle\Entity\ForgotPassword;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Bwch\Bundle\ContentBundle\Entity\User;
use Bwch\Bundle\ContentBundle\Form\Type\UserSignUpType;
use Bwch\Bundle\ContentBundle\Form\Type\UserSignInType;
use Bwch\Bundle\ContentBundle\Form\Type\ForgotPasswordType;
use Symfony\Component\Security\Core\Util\SecureRandom;

class UserController extends Controller
{
    public function signInAction(Request $request)
    {
        $request = $this->getRequest();
        $session = $request->getSession();

        $user = new User();

        $form = $this->createForm(new UserSignInType(), $user);
        $form->handleRequest($request);

        if ($this->get('request')->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $this->get('request')->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }

        if ($form->isValid()) {
            return $this->render(
                'BwchContentBundle:User:signInSuccess.html.twig');
        }

        return $this->render(
            'BwchContentBundle:User:signIn.html.twig',
            array(
                'form' => $form->createView(),
                'error' => $error,
            )
        );

    }

    public function signUpAction(Request $request)
    {
        $user = new User();

        $form = $this->createForm(new UserSignUpType(), $user);
        $form->handleRequest($request);

        if ($form->isValid()) {

            $factory = $this->get('security.encoder_factory');
            $encoder = $factory->getEncoder($user);
            $password = $encoder->encodePassword($user->getPassword(), $user->getSalt());
            $user->setPassword($password);

            $userEntity = array(
                'name' => $user->getUsername(),
                'email' => $user->getEmail(),
                'login' => $user->getLogin(),
                'password' => $user->getPassword(),
                'salt' => $user->getSalt(),
                'registration' => date('D M d Y H:i:s O', time()),
                'role' => 0,
            );

            $buzz = $this->container->get('buzz');
            $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveuser', array("Content-Type: application/json"), json_encode($userEntity));

            // TODO проверка на существование Login/Email или здесь, или на клиенте.
            return $this->render(
                'BwchContentBundle:User:signUpSuccess.html.twig',
                array('form' => $form->createView())
            );

            return $response;
        }

        return $this->render(
            'BwchContentBundle:User:signUp.html.twig',
            array('form' => $form->createView())
        );
    }

    public function signUpSuccessAction()
    {
        return $this->render(
            'BwchContentBundle:User:signUpSuccess.html.twig'
        );
    }

    public function forgotPasswordAction(Request $request)
    {
        $forgotPassword = new ForgotPassword();

        $form = $this->createForm(new ForgotPasswordType(), $forgotPassword);
        $form->handleRequest($request);

        $error = '';

        if ($form->isValid()) {

            $criteria = array(
                'login' => $forgotPassword->getLogin(),
                'email' => $forgotPassword->getEmail(),
            );

            $buzz = $this->container->get('buzz');
            $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'users/search/' . rawurlencode(json_encode($criteria)));
            $mongoUsers = json_decode($response->getContent());

            if (empty($mongoUsers)) {

                $error = 'User with email ' . $criteria['email'] . ' and login ' . $criteria['login'] . ' not found.';

                return $this->render(
                    'BwchContentBundle:User:forgotPassword.html.twig',
                    array(
                        'form' => $form->createView(),
                        'error' => $error,

                    )
                );

            } else {
                $mongoUser = $mongoUsers[0];

                $user = new User();

                $factory = $this->get('security.encoder_factory');
                $encoder = $factory->getEncoder($user);

                $generator = new SecureRandom();
                $password = $generator->nextBytes(10);
//		        $password = substr(str_shuffle('AaBbCcDdEe0123456789'), 7, 10);

                $mongoUser->password = $encoder->encodePassword($password, $mongoUser->salt);

                $buzz = $this->container->get('buzz');
                $response = $buzz->post($this->container->getParameter('bwch.server_url') . 'saveuser', array("Content-Type: application/json"), json_encode($mongoUser));

                $message = \Swift_Message::newInstance()
                    ->setSubject('Hello Email')
                    ->setFrom('send@example.com')
                    ->setTo('hermit@fx-trend.com')
                    ->setBody(
                        $this->renderView(
                            'BwchContentBundle:User:forgotPasswordEmail.html.twig',
                            array(
                                'login' => $criteria['login'],
                                'password' => $password,
                            )
                        )
                    )
                ;
                $this->get('mailer')->send($message);

                return $this->render(
                    'BwchContentBundle:User:forgotPasswordSuccess.html.twig'
                );
            }
        }

        return $this->render(
            'BwchContentBundle:User:forgotPassword.html.twig',
            array(
                'form' => $form->createView(),
                'error' => $error,

            )
        );
    }

    public function myAccountAction()
    {
        if ($this->get('request')->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $this->get('request')->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $this->get('request')->getSession()->get(SecurityContext::AUTHENTICATION_ERROR);
        }

        return $this->render('BwchContentBundle:User:myAccount.html.twig', array(
                'last_username' => $this->get('request')->getSession()->get(SecurityContext::LAST_USERNAME),
                'error' => $error,
                //'sc' => SecurityContext::getToken(),
            ));
    }

    public function testAction()
    {

        return $this->render('BwchContentBundle:User:test.html.twig', array(
                'user' => $this->getUser(),
        ));
    }

}