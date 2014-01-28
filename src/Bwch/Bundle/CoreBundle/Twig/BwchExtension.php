<?php

namespace Bwch\Bundle\CoreBundle\Twig;

use Twig_Extension;
use Twig_SimpleFunction;

class BwchExtension extends Twig_Extension
{
    public function getFunctions() {
        return array(
            new Twig_SimpleFunction('file_exists', 'file_exists'),
            new Twig_SimpleFunction('get_browser', 'get_browser'),
        );
    }

    public function getName() {

        return "file_exists";

    }
}