<?php
namespace Bwch\Bundle\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserSignInType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('login', 'text', array(
                'label' => 'Login',
                'required' => true
                ))
            ->add('password', 'password', array(
                'label' => 'Password',
                'required' => true
            ))
            ->add('submit', 'submit', array(
                    'label' => 'Sign In',
                ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                'data_class' => 'Bwch\Bundle\ContentBundle\Entity\User',
            ));
    }

    public function getName()
    {
        return 'userSignIn';
    }
}