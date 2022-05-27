import "./footer.css"

function Footer() {
    return ( 
        <footer id="footer" className="text-light bg-dark p-4">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 my-3 text-center">
                <div className="footer-info text-success">
                  <h3 >Gp<span>.</span></h3>
                  <p>
                    A108 Adam Street <br />
                    NY 535022, USA<br /><br />
                    <strong>Phone:</strong> +1 5589 55488 55<br />
                    <strong>Email:</strong> info@example.com<br />
                  </p>
                  <div className="social-links mt-3">
                    <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                    <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 footer-links my-3 text-center">
                <h4 className="text-success">Useful Links</h4>
                <ul>
                  <li className="listype"> <a href="">Home</a></li>
                  <li className="listype"> <a href="">About us</a></li>
                  <li className="listype"> <a href="">Services</a></li>
                  <li className="listype"> <a href="">Terms of service</a></li>
                  <li className="listype"> <a href="">Privacy policy</a></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6 footer-links my-3 text-center">
                <h4 className="text-success">Our Services</h4>
                <ul>
                  <li className="listype"> <a href="">Web Design</a></li>
                  <li className="listype"> <a href="">Web Development</a></li>
                  <li className="listype"> <a href="">Product Management</a></li>
                  <li className="listype"> <a href="">Marketing</a></li>
                  <li className="listype"> <a href="">Graphic Design</a></li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6 footer-newsletter text-success input-group my-3 text-center">
                <h4>Our Newsletter</h4>
                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                <form  method="post ">
                  <input type="email" name="email" className="form-control float-left w-75"/>
                  <input className="btn btn-success mt-0 ml-2" type="submit" defaultValue="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-5 text-center">
          <div className="copyright">
            Final <strong><span>Reactjs</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
           
            Designed by <a className="text-success" href="">My Team</a>
          </div>
        </div>
      </footer>

     );
}

export default Footer;