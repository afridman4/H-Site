<?php
namespace Bwch\Bundle\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', 'text', array(
                'label' => 'Your email',
                'required' => true
                ))
            ->add('username', 'text', array(
                'label' => 'Your name',
                'required' => true
                ))
            ->add('subject', 'text', array(
                'label' => 'Subject',
                'required' => true
                ))
            ->add('message', 'textarea', array(
                'label' => 'Message',
                'required' => true
            ))
            ->add('submit', 'submit', array(
                    'label' => 'Send',
                ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                'data_class' => 'Bwch\Bundle\ContentBundle\Entity\Message',
            ));
    }

    public function getName()
    {
        return 'contact';
    }
}