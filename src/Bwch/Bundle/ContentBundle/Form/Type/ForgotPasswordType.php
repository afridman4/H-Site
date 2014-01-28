<?php
namespace Bwch\Bundle\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ForgotPasswordType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Общая информация
            ->add('login', 'text', array(
                    'label' => 'Login',
                    'required' => true,
                ))
            ->add('email', 'text', array(
                    'label' => 'Email',
                ))
            ->add('submit', 'submit', array(
                    'label' => 'Send',
                ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                'data_class' => 'Bwch\Bundle\ContentBundle\Entity\ForgotPassword',
            ));
    }

    public function getName()
    {
        return 'forgot_password';
    }
}