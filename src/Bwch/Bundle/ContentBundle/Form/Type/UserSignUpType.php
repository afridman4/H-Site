<?php
namespace Bwch\Bundle\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserSignUpType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Общая информация
            ->add('login', 'text', array(
                    'label' => 'Login',
                    'required' => true,
            ))
            ->add('username', 'text', array(
                    'label' => 'Name',
                    'required' => true,
                ))
            ->add('password', 'repeated', array(
                    'type' => 'password',
                    'invalid_message' => 'The password fields must match.',
                    'required' => true,
                    'first_options'  => array('label' => 'Password'),
                    'second_options' => array('label' => 'Repeat Password'),
                ))
            ->add('email', 'text', array(
                    'label' => 'Email',
                ))
/*            ->add('phone', 'text', array(
                    'label' => 'Phone',
                ))*/
            ->add('submit', 'submit', array(
                    'label' => 'Sign Up',
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
        return 'userSignUp';
    }
}