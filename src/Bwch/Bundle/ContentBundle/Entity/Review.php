<?php

namespace Bwch\Bundle\ContentBundle\Entity;

use EWZ\Bundle\RecaptchaBundle\Validator\Constraints as Recaptcha;
use Symfony\Component\Validator\Constraints as Assert;

class Review {

    /**
     * @Assert\NotBlank()
     */
    protected $author;

    protected $time;

    /**
     * @Assert\NotBlank()
     * @Assert\NotEqualTo(value="Please select...", message="Please select provider")
     */
    protected $provider;

    protected $plan;

    protected $generalratings;

    protected $ratingOverallRating;

    protected $ratingService;

    protected $ratingReliability;

    protected $ratingPerformance;

    protected $ratingEaseOfUse;

    protected $ratingFeatureSet;

    protected $usedDateFrom;

    protected $usedDateTo;

    protected $stillUseIt;

    /**
     * @Assert\NotBlank(message="Please write a review")
     */
    protected $text;

    /**
     * @Recaptcha\True
     */
    public $recaptcha;

    public function getMongoTime()
    {
        return date('D M d Y H:i:s O',$this->getTime());
    }

    /**
     * @param mixed $ratingOverallRating
     */
    public function setRatingOverallRating($ratingOverallRating)
    {
        $this->ratingOverallRating = $ratingOverallRating;
    }

    /**
     * @return mixed
     */
    public function getRatingOverallRating()
    {
        return $this->ratingOverallRating;
    }

    /**
     * @param mixed $ratingEaseOfUse
     */
    public function setRatingEaseOfUse($ratingEaseOfUse)
    {
        $this->ratingEaseOfUse = $ratingEaseOfUse;
    }

    /**
     * @return mixed
     */
    public function getRatingEaseOfUse()
    {
        return $this->ratingEaseOfUse;
    }

    /**
     * @param mixed $ratingFeatureSet
     */
    public function setRatingFeatureSet($ratingFeatureSet)
    {
        $this->ratingFeatureSet = $ratingFeatureSet;
    }

    /**
     * @return mixed
     */
    public function getRatingFeatureSet()
    {
        return $this->ratingFeatureSet;
    }

    /**
     * @param mixed $ratingPerformance
     */
    public function setRatingPerformance($ratingPerformance)
    {
        $this->ratingPerformance = $ratingPerformance;
    }

    /**
     * @return mixed
     */
    public function getRatingPerformance()
    {
        return $this->ratingPerformance;
    }

    /**
     * @param mixed $ratingReliability
     */
    public function setRatingReliability($ratingReliability)
    {
        $this->ratingReliability = $ratingReliability;
    }

    /**
     * @return mixed
     */
    public function getRatingReliability()
    {
        return $this->ratingReliability;
    }

    /**
     * @param mixed $ratingService
     */
    public function setRatingService($ratingService)
    {
        $this->ratingService = $ratingService;
    }

    /**
     * @return mixed
     */
    public function getRatingService()
    {
        return $this->ratingService;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $generalratings
     */
    public function setRatingGeneralRatings($generalratings)
    {
        $this->generalratings = $generalratings;
    }

    /**
     * @return mixed
     */
    public function getRatingGeneralRatings()
    {
        return $this->generalratings;
    }

    /**
     * @param mixed $plan
     */
    public function setPlan($plan)
    {
        $this->plan = $plan;
    }

    /**
     * @return mixed
     */
    public function getPlan()
    {
        return $this->plan;
    }

    /**
     * @param mixed $provider
     */
    public function setProvider($provider)
    {
        $this->provider = $provider;
    }

    /**
     * @return mixed
     */
    public function getProvider()
    {
        return $this->provider;
    }

    /**
     * @param mixed $stillUseIt
     */
    public function setStillUseIt($stillUseIt)
    {
        $this->stillUseIt = $stillUseIt;
    }

    /**
     * @return mixed
     */
    public function getStillUseIt()
    {
        return $this->stillUseIt;
    }

    /**
     * @param mixed $usedDateFrom
     */
    public function setUsedDateFrom($usedDateFrom)
    {
        $this->usedDateFrom = $usedDateFrom;
    }

    /**
     * @return mixed
     */
    public function getUsedDateFrom()
    {
        return $this->usedDateFrom;
    }

    /**
     * @param mixed $usedDateTo
     */
    public function setUsedDateTo($usedDateTo)
    {
        $this->usedDateTo = $usedDateTo;
    }

    /**
     * @return mixed
     */
    public function getUsedDateTo()
    {
        return $this->usedDateTo;
    }

    /**
     * @param mixed $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * @return mixed
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param mixed $time
     */
    public function setTime($time)
    {
        $this->time = $time;
    }

    /**
     * @return mixed
     */
    public function getTime()
    {
        return $this->time;
    }

}