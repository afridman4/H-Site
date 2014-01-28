<?php
namespace Bwch\Bundle\ContentBundle\Entity;

use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class UserProvider implements UserProviderInterface
{
    private $container;

    public function __construct(Container $container) {
        $this->container = $container;
    }

    public function loadUserByUsername($login)
    {
        $searchCriteria = array(
            'login' => $login,
        );
        $buzz = $this->container->get('buzz');
        $response = $buzz->get($this->container->getParameter('bwch.server_url') . 'users/search/' . rawurlencode(json_encode($searchCriteria)));
        $mongoUsers = json_decode($response->getContent());

        if (!empty($mongoUsers)) {
            $mongoUser = (array)$mongoUsers[0];

            $user = new User();
            $user->setUsername($mongoUser['name']);
            $user->setLogin($mongoUser['login']);
            $user->setPassword($mongoUser['password']);
            $user->setSalt($mongoUser['salt']);
            $user->setEmail($mongoUser['email']);
            $user->setRole($mongoUser['role']);
            $user->setRegistrationDate($mongoUser['registration']);

            return $user;
        }

        throw new UsernameNotFoundException(sprintf('Username with login "%s" does not exist.', $login));
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByUsername($user->getLogin());
    }

    public function supportsClass($class)
    {
        return $class === 'Bwch\ContentBundle\Entity\User';
    }
}