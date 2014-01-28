<?php

namespace Bwch\Bundle\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('BwchAdminBundle:Main:index.html.twig');
    }

    public function loadGridAction($grid)
    {
        $request = $this->getRequest();
        $request->setLocale('ru_RU');

        try {
            return $this->get('templating')->renderResponse("BwchAdminBundle:Grids:$grid.html.twig");
        } catch (\Exception $ex) {
            return $this->get('templating')->renderResponse("BwchAdminBundle:Grids:none.html.twig", array('grid' => $grid));
        }

    }

}
