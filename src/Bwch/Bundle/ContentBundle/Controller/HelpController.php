<?php

namespace Bwch\Bundle\ContentBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Bwch\Bundle\ContentBundle\Entity\Message;
use Bwch\Bundle\ContentBundle\Form\Type\ContactType;

class HelpController extends Controller
{
    public function helpAction()
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
            'BwchContentBundle::letushelp.html.twig',
            array('htypes' => $htypes)
        );

    }
    public function contactAction(Request $request)
    {

        $message = new Message();
        $user = $this->getUser();

        if ($user != null) {
            $message->setEmail($user->getEmail());
            $message->setUsername($user->getUsername());
        }

        $error = '';

        $form = $this->createForm(new ContactType(), $message);

        $form->handleRequest($request);

        if ($form->isValid()) {

            $email_message = \Swift_Message::newInstance()
                            ->setSubject($message->getSubject())
                            ->setFrom($message->getEmail())
                            ->setTo('support@xxx.com')
                            ->setBody(
                                $this->renderView(
                                    'BwchContentBundle::contactEmail.html.twig',
                                    array(
                                        'username' => $message->getUsername(),
                                        'email' => $message->getEmail(),
                                        'text' => $message->getMessage()
                                    )
                                )
                            )
                        ;
                        $this->get('mailer')->send($email_message);

                        return $this->render(
                            'BwchContentBundle::contactSuccess.html.twig',
                            array(
                                        'username' => $message->getUsername(),
                                        'email' => $message->getEmail(),
                                        'text' => $message->getMessage()
                            )
                        );
        }

        return $this->render(
            'BwchContentBundle::contact.html.twig', array (
                'form' => $form->createView(),
                'error' => $error
            )

        );
    }
}
