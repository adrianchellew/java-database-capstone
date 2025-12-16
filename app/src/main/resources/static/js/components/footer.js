/*
       ```




  9. Close the Footer Container

     * Close the `footer-container` div to ensure proper structure.
       ```html
       </div> <!-- End of footer-container -->
       ```

  10. Close the Footer Element

     * Finally, close the `<footer>` tag to complete the footer section.
       ```html
       </footer>
       ```

  11. Footer Rendering Complete

     * The `footer.innerHTML` code completes the dynamic rendering of the footer by injecting the structured HTML content into the `footer` element on the page.



  Call the renderFooter function to populate the footer in the page

*/
function renderFooter() {
    const footer = document.getElementById("footer");

    footer.innerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-logo">
                    <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" />
                    <p>© Copyright 2025. All Rights Reserved by Hospital CMS.</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                         <h4>Company</h4>
                         <a href="#">About</a>
                         <a href="#">Careers</a>
                         <a href="#">Press</a>
                    </div>
                    <div class="footer-column">
                         <h4>Support</h4>
                         <a href="#">Account</a>
                         <a href="#">Help Center</a>
                         <a href="#">Contact Us</a>
                    </div>
                    <div class="footer-column">
                         <h4>Legals</h4>
                         <a href="#">Terms & Conditions</a>
                         <a href="#">Privacy Policy</a>
                         <a href="#">Licensing</a>
                    </div>
                </div>
            </div><!-- End of footer-container -->
        </footer>`;
}

renderFooter();