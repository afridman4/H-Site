<?php
namespace Bwch\Bundle\ContentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\Collection;
use EWZ\Bundle\RecaptchaBundle\Validator\Constraints\True as Recaptcha;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ReviewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Общая информация
            ->add('author', 'text', array(
                    'label' => 'Author',
                ))
            ->add('provider', 'text', array(
                    'label' => 'Provider',
                ))
            ->add('plan', 'text', array(
                    'label' => 'Plan name',
                ))
            // Интервал использования
            ->add('usedDateFrom', 'text', array(
                    'label' => 'Used from',
                    'read_only' => true,
                    'data' => date('Y-m-d'),
                    //'widget' => 'single_text',
                    //'input' => 'string',
                ))
            ->add('usedDateTo', 'text', array(
                    'label' => 'until',
                    'read_only' => true,
                    'data' => date('Y-m-d'),
                    //'widget' => 'single_text',
                    //'input' => 'string',
                ))
            ->add('stillUseIt', 'hidden', array(
                    'data' => 0,
                ))
            // Рейтинги
            ->add('ratingGeneralRatings', 'hidden', array(
                    'data' => 0
                ))
            ->add('ratingService', 'hidden', array(
                    'data' => 0
                ))
            ->add('ratingReliability', 'hidden', array(
                    'data' => 0
                ))
            ->add('ratingPerformance', 'hidden', array(
                    'data' => 0
                ))
            ->add('ratingEaseOfUse', 'hidden', array(
                    'data' => 0
                ))
            ->add('ratingFeatureSet', 'hidden', array(
                    'data' => 0
                ))
            // Описание
            ->add('text', 'textarea', array(
                    'label' => 'Write a review',
                ))
            // Отправка формы и капча
            ->add('submit', 'submit', array(
                    'label' => 'Submit',
                ))
            ->add('recaptcha', 'ewz_recaptcha', array(
                    'attr'          => array(
                        'options' => array(
                            'theme' => 'custom'
                        )
                    ),
                ));

    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                'data_class' => 'Bwch\Bundle\ContentBundle\Entity\Review',
            ));
    }

    public function getName()
    {
        return 'review';
    }
}