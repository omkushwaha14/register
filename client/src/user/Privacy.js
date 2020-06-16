import React from "react";
 

const Privacy = () => (
    <div className="container">
  <div className="">
      <h4>Privacy Policy</h4>

      <div className="jumbotron jumbotron-fluid">
          <div className="container">
              <h5>Personal information</h5>
              <p>1.Here at wordbok we take personal privacy very seriously. As a general rule wordbok
                  does not collect your personal information unless you chose to provide that information to us.
                  When you choose to provide us with your personal information, you are giving wordbok your permission
                  to use that information for the stated purposes listed in this privacy policy.
                  If you choose not to provide us with that information, it might limit the features and services that
                  you can use on this website.</p><br/>
                  <p>2.All the information that you provide like Name,email,password etc are privately stored.
                  password you login through is encrypted, not even admin can see your passoword</p>
              <p>3.The profile image you upload is stored in binary format to protect the missuse of your image</p>
          </div>
      </div>


      <div className="jumbotron jumbotron-fluid">
          <div className="container">
              <h5>Security</h5>
              <p>1.wordbok takes the security of your personal information very seriously.
                  We take many precautions to ensure that the information we collect is secure
                  and inaccessible by anyone outside of our organization. These precautions include
                  advanced access controls to limit access to that information to only internal personnel
                  who require access to that information. We also use numerous security technologies to protect
                  all data stored on our servers and related systems. Our security measures
                  are regularly upgraded and tested to ensure they are effective.</p><br/>
              <h6>We take the following specific steps to protect your information:</h6>
              <p> (1) Use internal access controls so only limited personnel have access to your information.<br/>
                  (2) Anyone with access to user information is trained on all relevant security and compliance policies.<br/>
                  (3) Servers that store visitor information are regularly backed up to protect against loss.<br/>
                  (4) All information is secured through modern security technologies like secure socket layer (SSL), encryption, firewalls, and secure passwords.<br/>
              </p>
          </div>
      </div>










  </div>



    </div>
);

export default Privacy;
