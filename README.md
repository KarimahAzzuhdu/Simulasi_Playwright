# **Simulasi QA - Automation Test**
Tujuan utama dari proyek ini adalah melakukan simulasi pekerjaan Quality Assurance (QA) mulai dari perencanaan hingga pelaporan. Karena objek pengujian merupakan situs demo web publik dan dokumen seperti product requirement tidak tersedia, maka fokus simulasi pengujian hanya berdasarkan tipe-tipe pengujian umum seperti Fuctionality Testing, Data Validation Testing, dsb.

---

## **Automation Web UI Test Plan**

#### **1. *Test Plan* ID**
SIMUL-TEST-UI-01

#### **2. Pendahuluan**
*Test Plan* ini berisi garis besar strategi dan metode pengujian terhadap antarmuka situs  [SauceDemo](https://www.saucedemo.com/) secara otomatis. Fokus utama pada proyek pengujian ini adalah verifikasi elemen antarmuka situs web, fungsionalitas, penanganan error, kompatibilitas, dan validasi data.

#### **3. Cakupan**
Komponen pengujian yang akan dilakukan meliputi:
- Functionality Testing : Komponen antarmuka situs web, termasuk login, cart, dan halaman product
- Data Validation Testing : Validasi data terhadap detail product
- Compatibility Testing : Kompatibilitas situs web pada beragam browser dan perangkat
- Error Handling Testing : Verifikasi penanganan error untuk fungsi login

Komponen pengujian yang tidak akan dilakukan meliputi:
- Security Testing
- Performance Testing, hanya dilakukan secara manual

#### **4. Tujuan**
Tujuan dari *Test Plan*
- Verifikasi fungsionalitas situs web dan konsistensi antarmuka dengan pengujian otomatis
- Mendeteksi masalah fungsional atau antarmuka pada tahap awal pengembangan
- Memastikan situs web bekerja dengan baik pada berbagai browser dan perangkat.

#### **5. *Test Strategy***
Metode pengujian ini terdiri dari :
- Automation Test menggunakan Playwright dan/atau Selenium
- Bahasa yang digunakan adalah JavaScript dan/atau Python
- Seluruh script disimpan di repository github, untuk kedepannya simulasi github action (integration to CI/CD pipelines)

#### **6. *Test Items***
Fitur pada situs web yang akan diuji :
1. **Login Functionality:** Verifying login/logout flow with valid and invalid credentials.
2. **Product Listing and Details:** Checking product details, pricing accuracy, and data consistency.
3. **Cart Functionality:** Ensuring products are correctly added/removed from the cart and the cart count updates accordingly.
4. **Error Handling:** Validating proper error messages for invalid login attempts.
5. **Compatibility:** Testing website functionality on Chrome, Firefox, and Safari (desktop and mobile views).

#### **7. Jadwal *Test Execution***
| Activity           	| Start Date   | End Date 	|
|------------------------|--------------|--------------|
| Test Plan Creation 	| Oct 10, 2024| Oct 11, 2024|
| Test Case Development  | Oct 10, 2024| Oct 11, 2024|
| Test Script Automation | Oct 11, 2024| Oct 14, 2024|
| Test Execution     	| Oct 11, 2024| Oct 14, 2024|
| Test Report Generation | Oct 14, 2024| Oct 15, 2024|

#### **8. *Test Environment***
- **Browser:** Chrome dan Firefox
- **Sistem Operasi:** Windows
- **Perangkat:** Desktop

#### **9. *Test Cases***
update nanti.. ini dari chatgpt
##### Functionality Testing:
| Test ID  | Test Case Description                     	| Expected Outcome                                  	|
|----------|----------------------------------------------|-------------------------------------------------------|
| TC_F_01  | Verify login with valid credentials      	| User logs in successfully and navigates to the product page |
| TC_F_02  | Verify login with invalid credentials    	| Appropriate error message displayed               	|
| TC_F_03  | Verify adding product to cart            	| Product appears in cart and cart count updates    	|
| TC_F_04  | Verify removing product from cart        	| Product removed from cart, and cart count updates 	|

##### Data Validation Testing:
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_DV_01 | Verify product names match across pages   	| Product names are consistent on all pages         	|
| TC_DV_02 | Verify product prices are accurate        	| Product prices match on the listing and detail page   |

##### Error Handling Testing:
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_EH_01 | Verify error message for blank login fields   | Displays "Username is required" message           	|
| TC_EH_02 | Verify error message for incorrect password   | Displays "Username and password do not match" message |

##### Compatibility Testing:
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_C_01  | Verify login on Chrome                    	| Login functionality works as expected             	|
| TC_C_02  | Verify login on Firefox                   	| Login functionality works as expected             	|
| TC_C_03  | Verify responsive design on mobile emulation  | Elements resize and display properly              	|

#### **10. *Test Automation Tools***
- **Framework:** Playwright dan/atau Selenium
- **Languages:** JavaScript (Node.js) atau Python (PyTest)
- **Continuous Integration (CI) Tool:** GitHub Actions
- **Test Report Generation:** ***To be decided later***

#### **11. *Test Criteria***
update nanti.. ini dari chatgpt
- **Entry Criteria:**
  - Test environment setup completed.
  - Application deployed and stable for testing.
  - Automation test cases developed and reviewed.

- **Exit Criteria:**
  - All high-priority test cases executed.
  - All critical bugs resolved or accepted for future release.
  - Test report generated and reviewed by stakeholders.

#### **12. Roles and Responsibilities**
ALL ME!!
update nanti.. ini dari chatgpt
- **Test Manager:** Oversees overall testing activities, reviews the final report.
- **Automation Test Engineer:** Develops and executes automated test scripts.
- **Developer:** Fixes any bugs found during testing.
- **Product Owner:** Reviews and signs off the test results.

#### **13. Manajemen Risiko**
update nanti.. ini dari chatgpt
| Risk                      	| Mitigation Strategy                      	|
|-------------------------------|----------------------------------------------|
| Frequent UI changes       	| Implement modular test scripts to adapt to UI updates |
| Inconsistent environment setup| Use Docker containers for consistent testing environments |
| Network issues on CI server   | Use stable network infrastructure with fallback mechanisms |

#### **14. *Deliverables***
- Sebelum Pengujian : Test Plan + Test Case (dalam README)
- Selama Pengujian : Automated Test Scripts + Test Execution Reports (dalam repo ini)
- Setelah Pengujian : Test Summary Report (*attachment later*)

#### **15. Persetujuan**
| Role            	| Nama        	| Tanda Tangan    	| Tanggal       	|
|---------------------|-----------------|------------------|----------------|
| Test Manager    	| Me            	| Signed             	|            	|
| Automation Engineer | Me           	|  Signed            	|            	|
| Product Owner   	| Not Me            	| -             	|  -          	|

---

