{{{
  "title": "Billing Plan Requirements for Partners",
  "date": "06-09-2015",
  "author": "Andrew Brunette",
  "attachments": [],
  "contentIsHTML": false
}}}

###Billing Facts For Partners
This article provides background for AppFog V2 partners to use to plan for billing usage of their products when used through CenturyLink AppFog V2.  AppFog V2 is released to Beta currently.  Partners are able to integrate to the Beta release.  
The above Knowledge Base article describes the centerpiece of the integration, the manifest.  The manifest calls out descriptions of plans.  This article describes the entries required for plans in greater detail. 

####Overall Capabilities Planned
Customer signup to your service through the AppFog marketplace:  Customers will be able to select one of an enumerated set of billing plans.  For the Beta period, you must provide a free tier plan for customers to test.  Paid plans will not be supported during the Beta. This capability is available now. 
Billing and remittance:  CenturyLink Cloud will bill for your service at the fixed level required for the selected plan.  CLC will not bill usage based plans, eg, if you are a database service, we will not be able to bill a plan that costs 10 cents per GB per month stored.  Your plan must have a set price per plan level per period.  This capability will be available later in 2015.  

####Integration Approach:
The overall description of integration is available here:  https://www.centurylinkcloud.com/knowledge-base/ecosystem-partners/migrate-appfog-addon-to-addon-engine/.  Note the example plans in the manifest file, and see the example below.  For the beta, you must have a no-cost plan available for the user to try.  As you design your plans, please consider the following conventions:  
  1)	Please name your free plan something other than “Free Plan”. Consider the naming choices used by your peers in the market place, and choose a name that conveys the value of your service to the customer.   The entry plan is often given a name like “Brass” (compared to silver and gold), “Developer”, “Evaluation” or similar
  2)	Please do not include the term “AppFog” in your name; it is implied by your existence in the marketplace.  
  3)	Consider the length of the name of your plan, as it will be typed at the command line by users.  “super-dedicated-top-level-exclusive-plan” would be painful for command line users.  
  4)	Minimize the use of underscores and hyphens.  
  5)	Do not use version identifiers in the plan name, eg., “gold-v2” is not acceptable. 
  
####Product plan requirements
Your product plan must be a tiered plan, with a no-cost option for users to use during the Beta. 
Tiers in the plan must not require usage measurement or metering by CenturyLink. 
Management of any usage limits is the responsibility of the service provider.  

####Manifest File Plan Example:
The following is an example plan section in the manifest file.  Note that, for the beta period, one of the options must be a no-cost option.  In this example, it is the ‘developer’ option

    "plans": [
      {"id": "developer",
       "name": "developer",
       "description": "No cost ‘Getting started’ option"
      },
      {"id": "departmental",
       "name": "departmental",
       "description": "Midlevel consumption for departmental intallations"
      },
      {"id": "enterprise",
       "name": "enterprise edition",
       "description": "unlimited usage enterprise installation"
      }
    ]
