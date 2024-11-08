# **Simulasi QA - Automation Test**
Tujuan utama dari proyek ini adalah melakukan simulasi pekerjaan Quality Assurance (QA) mulai dari perencanaan hingga pelaporan. Karena objek pengujian merupakan situs demo web publik dan dokumen seperti product requirement tidak tersedia, maka fokus simulasi pengujian hanya berdasarkan tipe-tipe pengujian umum seperti Fuctionality, Data Validation, dsb.

campur2 b.inggris dan b.indo karena malas translate. 

---

## **Automation Web UI Test Plan**

#### **1. *Test Plan* ID**
SIMUL-TEST-UI-01

#### **2. Pendahuluan**
*Test Plan* ini berisi garis besar strategi dan metode pengujian terhadap antarmuka situs  [SauceDemo](https://www.saucedemo.com/) secara otomatis. Fokus utama pada proyek pengujian ini adalah verifikasi elemen antarmuka situs web, fungsionalitas, penanganan error, kompatibilitas, dan validasi data.

#### **3. Cakupan**
Komponen pengujian yang akan dilakukan meliputi:
- Functionality & Usability : Komponen antarmuka situs web, termasuk login, cart, dan halaman product
- Data Validation : Validasi data terhadap detail product
- Error Handling : Verifikasi penanganan error untuk fungsi login
- Compatibility : Kompatibilitas situs web pada beragam browser dan perangkat

Komponen pengujian yang tidak akan dilakukan meliputi:
- Security
- Performance

#### **4. Tujuan**
Tujuan dari *Test Plan*
- Verifikasi fungsionalitas situs web dan konsistensi antarmuka dengan pengujian otomatis
- Mendeteksi masalah fungsional atau antarmuka pada tahap awal pengembangan
- Memastikan situs web bekerja dengan baik pada berbagai browser dan perangkat.

#### **5. *Test Items (app's features)***
Fitur pada situs web yang akan diuji :
1. **Login** 
2. **Product (Listing and Details)** 
3. **Cart** 
4. **Checkout**

#### **6. *Test Strategy***
Metode/Pendekatan pengujian ini secara garis besar sebagai berikut:
- Automation Test menggunakan Playwright (dan/atau Selenium di masa depan)
- Bahasa yang digunakan adalah JavaScript
- Seluruh Test Script disimpan di repository github, untuk kedepannya simulasi github action (integration to CI/CD pipelines)
- Seluruh Test Script dieksekusi pada beberapa browser dan perangkat untuk pengujian kompatibilitas.

#### **7. Jadwal *Test Execution***
| Activity           	| Start Date   | End Date 	|
|------------------------|--------------|--------------|
| Test Plan Creation 	| Oct 10, 2024| Oct 11, 2024|
| Test Case Development  | Oct 10, 2024| Oct 11, 2024|
| Test Script Automation | Oct 11, 2024| Oct 16, 2024|
| Test Execution     	| Oct 11, 2024| Oct 16, 2024|
| Test Report Generation | Oct 16, 2024| Oct 17, 2024|

*note : I'll continue update this repo, so this schedule is actually not necessary nor relevant.*

#### **8. *Test Environment & Test Data***
##### Test Environment :
   - **Browser:** Chrome dan Firefox
   - **Sistem Operasi:** Windows, Android, IOS
   - **Perangkat:** Browser Desktop (Chromium, Firefox, webkit), Browser Mobile (Chrome, Safari)
##### Test Data :
| Accepted usernames | Password |
|--------------------|----------|
| standard_user | secret_sauce|
| locked_out_user | secret_sauce|
| problem_user | secret_sauce|
| performance_glitch_user | secret_sauce|
| error_user | secret_sauce|
| visual_user | secret_sauce|

*note : main test is only use standard_user, but for exploration I'll maybe use other username.*

#### **9. *Test Scenarios & Test Cases***
Perancangan Test Scenario dilakukan berdasarkan Test Item, kemudian diturunkan menjadi beberapa Test Case yang dirancang berdasarkan cakupan pengujian (Test Scope).

| Test Sc ID | Test Scenario |
|------------|---------------|
| TS-01	| User Login - Logout Web |
| TS-02	| User see Product Information |
| TS-03	| User put product in the cart |
| TS-04	| User buy the products |
| TS-N-01	| User try to access web without login |

Test Case dikelompokan berdasarkan Fitur Web.
#### LOGIN
| Test ID  | Test Case Description                     	| Expected Outcome                                  	|
|----------|----------------------------------------------|-------------------------------------------------------|
| TC-LOG-01 | Verify Login Page | Login page has login attribute |
| TC_LOG_02 | Verify login process with valid credentials      	| User logs in successfully and navigates to the product page |
| TC_LOG_03 | Verify error message for blank username field   | Displays "Username is required" message           	|
| TC_LOG_04 | Verify error message for blank password field   | Displays "Password is required" message           	|
| TC_LOG_05 | Verify error message for incorrect password   | Displays "Username and password do not match" message |
| TC_LOG_06 | Verify logout process   | User logs out successfully and redirect back to login page |
| TC_LOGN_01  | Verify error message for cart page without login        	| Redirect to Login Page and displays error message 	|
| TC_LOGN_02 | Verify error message for checkout-info page without login |  Redirect to Login Page and displays error message   	|
| TC_LOGN_03 | Verify error message for checkout-overview inventory page without login |   Redirect to Login Page and displays error message  	|
| TC_LOGN_04 | Verify error message for checkout-complete inventory page without login |  Redirect to Login Page and displays error message   	|
| TC_LOGN_05 | Verify error message for access inventory page without login	| Redirect to Login Page and displays error message 	|
| TC_LOGN_06 | Verify error message for access inventory-item page without login	| Redirect to Login Page and displays error message  |

#### PRODUCT
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_PROD_01 | Verify Inventory Page and Inventory Item Page 	|  User can see product listing and product detail        	|
| TC_PROD_02 | Verify product information (name, description, price, image) match across pages   	|  Product information match on the listing and detail page         	|
| TC_PROD_03 | Verify sort product function by names and prices  	| Product listing can get sorted by names and prices         	|

#### CART
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_CART_01  | Verify Cart Page | User can see cart page attributes  |
| TC_CART_02  | Verify adding product to cart at inventory page	| Product appears in cart, cart count updates, and product information are accurate    	|
| TC_CART_03  | Verify adding product to cart at inventory-item page 	| Product appears in cart, cart count updates, and product information are accurate    	|
| TC_CART_04  | Verify removing product from cart at cart page | Product removed from cart, and cart count updates 	|
| TC_CART_05  | Verify removing product from cart at inventory page | Product removed from cart, and cart count updates 	|
| TC_CART_06  | Verify removing product from cart at inventory-item page | Product removed from cart, and cart count updates 	|

#### CHECKOUT
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_CO_01 | Verify Checkout Page | User can do Checkout Process successfully |
| TC_CO_02 | Verify data product are accurate in checkout process | Checkout product information (espesially price) match and accurate on the cart and checkout page.    	|
| TC_CO_03 | Verify error message for blank fields |  Displays "First Name is required", "Last Name is required", and "Postal Code is required" message   	|

#### **10. *Test Automation Tools***
- **Framework:** Playwright
- **Languages:** JavaScript (Node.js)
- **Continuous Integration (CI) Tool:** GitHub Actions
- **Test Report Generation:** Allure Report

catatan : Simulasi dengan tools lain disimpan direpo terpisah

#### **11. *Test Criteria***
- **Entry Criteria:**
  - Test Environment, Test Data, dan Test Automation Tools telah disiapkan.
  - Aplikasi telah di-deploy dan dalam posisi *staged & stable*.
  - Test Case telah dibuat dan direview.

- **Exit Criteria:**
  - Seluruh Test Case telah dieksekusi dan 'passed'.
  - Test Report telah dibuat dan direview.

#### **12. Roles and Responsibilities**
*In this project, it's all My responsibilities!! but normally*:
- **Test Manager:** Mengawasi seluruh aktivitas pengujian dan mereview laporan pengujian
- **Automation Test Engineer:** Mengembangkan dan mengeksekusi test scripts
- **Developer:** Memperbaiki seluruh defect/bug yang ditemukan saat pengujian
- **Product Owner:** Mereview dan menandatangani Test Result

#### **13. Manajemen Risiko**
| Risk                      	| Mitigation Strategy                      	|
|-------------------------------|----------------------------------------------|
| Perubahan pada antarmuka web secara berkala       	| Mengimplementasikan script test yang bersifat modular sehingga dapat beradaptasi akan perubahan antarmuka |

#### **14. *Deliverables***
- Sebelum Pengujian : Test Plan + Test Case 
- Selama Pengujian : Automated Test Scripts + Test Execution Reports
- Setelah Pengujian : Test Summary Report

Dokumen *deliverables* :
- this Readme.md
- [Spreadsheet](https://docs.google.com/spreadsheets/d/1WSkpfRSW-AHytkczOH_ZPBTiyYmuoSX0uBW6wTI3VE4/edit?usp=sharing)
- [Allure Report](http://karimahazzuhdu.github.io/Simulasi_Playwright)

#### **15. Persetujuan**
*In this project, it's all Me (except prod's owner ofc)!! but normally*:
| Role            	| Nama        	| Tanda Tangan    	| Tanggal       	|
|---------------------|-----------------|------------------|----------------|
| Test Manager    	| Me            	| Signed             	|            	|
| Automation Engineer | Me           	|  Signed            	|            	|
| Product Owner   	| Not Me            	| -             	|  -          	|

---

