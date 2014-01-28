<?php

use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Sensio\Bundle\BuzzBundle\SensioBuzzBundle(),
            new Bwch\Bundle\AjaxBundle\BwchAjaxBundle(),
            new Bwch\Bundle\ContentBundle\BwchContentBundle(),
            new Bwch\Bundle\CoreBundle\BwchCoreBundle(),
            new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
        );

        // Если мы не в режиме ajax запросов, то "поднимем" весь проект
        if ($this->getEnvironment() != 'ajax') {
            $bundles[] = new Symfony\Bundle\SecurityBundle\SecurityBundle();
            $bundles[] = new Symfony\Bundle\TwigBundle\TwigBundle();
            $bundles[] = new Symfony\Bundle\MonologBundle\MonologBundle();
            $bundles[] = new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle();
            $bundles[] = new Symfony\Bundle\AsseticBundle\AsseticBundle();
            $bundles[] = new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle();
            $bundles[] = new EWZ\Bundle\RecaptchaBundle\EWZRecaptchaBundle();
            $bundles[] = new Bwch\Bundle\AdminBundle\BwchAdminBundle();
        }

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
