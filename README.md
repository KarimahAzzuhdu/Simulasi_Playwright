# **Simulasi QA - Automation Test**
Tujuan utama dari proyek ini adalah melakukan simulasi pekerjaan Quality Assurance (QA) mulai dari perencanaan hingga pelaporan. Karena objek pengujian merupakan situs demo web publik dan dokumen seperti product requirement tidak tersedia, maka fokus simulasi pengujian hanya berdasarkan tipe-tipe pengujian umum seperti Fuctionality Testing, Data Validation Testing, dsb.

campur2 b.inggris dan b.indo karena bingung translate. 

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
- Error Handling Testing : Verifikasi penanganan error untuk fungsi login
- Compatibility Testing : Kompatibilitas situs web pada beragam browser dan perangkat

Komponen pengujian yang tidak akan dilakukan meliputi:
- Security Testing
- Performance Testing, hanya dilakukan secara manual

#### **4. Tujuan**
Tujuan dari *Test Plan*
- Verifikasi fungsionalitas situs web dan konsistensi antarmuka dengan pengujian otomatis
- Mendeteksi masalah fungsional atau antarmuka pada tahap awal pengembangan
- Memastikan situs web bekerja dengan baik pada berbagai browser dan perangkat.

#### **5. *Test Items***
Fitur pada situs web yang akan diuji :
1. **Login** 
2. **Product Listing and Details** 
3. **Cart** 

#### **6. *Test Strategy***
Metode/Pendekatan pengujian ini secara garis besar sebagai berikut:
- Automation Test menggunakan Playwright dan/atau Selenium
- Bahasa yang digunakan adalah JavaScript dan/atau Python
- Seluruh Test Script disimpan di repository github, untuk kedepannya simulasi github action (integration to CI/CD pipelines)
- Seluruh Test Script dieksekusi pada beberapa browser dan perangkat untuk pengujian kompatibilitas.

#### **7. Jadwal *Test Execution***
| Activity           	| Start Date   | End Date 	|
|------------------------|--------------|--------------|
| Test Plan Creation 	| Oct 10, 2024| Oct 11, 2024|
| Test Case Development  | Oct 10, 2024| Oct 11, 2024|
| Test Script Automation | Oct 11, 2024| Oct 14, 2024|
| Test Execution     	| Oct 11, 2024| Oct 14, 2024|
| Test Report Generation | Oct 14, 2024| Oct 15, 2024|

#### **8. *Test Environment & Test Data***
##### Test Environment :
   - **Browser:** Chrome dan Firefox
   - **Sistem Operasi:** Windows
   - **Perangkat:** Desktop, Mobile Phone *to be decided later*
##### Test Data :
| Accepted usernames | Password |
|--------------------|----------|
| standard_user | secret_sauce|
| locked_out_user | secret_sauce|
| problem_user | secret_sauce|
| performance_glitch_user | secret_sauce|
| error_user | secret_sauce|
| visual_user | secret_sauce|

#### **9. *Test Scenarios & Test Cases***
Perancangan Test Scenario dilakukan berdasarkan Test Item, kemudian diturunkan menjadi beberapa Test Case yang dirancang berdasarkan cakupan pengujian (Test Scope)
#### Test Scenario : Memverifikasi alur login/logout dengan kredensial yang valid dan tidak valid.
*Prerequisites condition*: User already registered
| Test ID  | Test Case Description                     	| Expected Outcome                                  	|
|----------|----------------------------------------------|-------------------------------------------------------|
| TC-LOG-01 | Verify Login Page | Login page has login attribute |
| TC_LOG_02 | Verify login with valid credentials      	| User logs in successfully and navigates to the product page |
| TC_LOG_03 | Verify error message for blank username fields   | Displays "Username is required" message           	|
| TC_LOG_04 | Verify error message for blank password fields   | Displays "Password is required" message           	|
| TC_LOG_05 | Verify error message for incorrect password   | Displays "Username and password do not match" message |
| TC_LOG_06 | Verify logout   | User logs out successfully and redirect back to login page |

#### Test Scenario : Memeriksa detail produk, akurasi harga produk, dan konsistensi data produk.
*Prerequisites condition*: User already log in, ...
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_PROD_00 | Prerequisites Test | Halaman Inventory tidak dapat diakses |
| TC_PROD_01 | Verify Inventory Page and Inventory Item Page 	|  User can see product listing and product detail        	|
| TC_PROD_02 | Verify product names match across pages   	|  Product names match on the listing and detail page         	|
| TC_PROD_03 | Verify product prices are accurate        	| Product prices match on the listing and detail page   |
| TC_PROD_04 | Verify product image match across pages   	|  Product image match on the listing and detail page         	|
| TC_PROD_05 | Verify product description match across pages   	|  Product description match on the listing and detail page         	|
| TC_PROD_06 | Verify sort product function by names and prices  	| Product listing can get sorted by names and prices         	|

#### Test Scenario : Memverifikasi alur pembelian produk seperti memastikan kesesuaian produk saat ditambahkan/dihapuskan dari Keranjang Belanja (Cart).
*Prerequisites condition*: User already log in, ...
| Test ID  | Test Case Description                      	| Expected Outcome                                  	|
|----------|-----------------------------------------------|-------------------------------------------------------|
| TC_CART_00 | Prerequisites Test | Halaman Cart tidak dapat diakses |
| TC_CART_01  | Verify adding product to cart            	| Product appears in cart and cart count updates    	|
| TC_CART_02  | Verify removing product from cart        	| Product removed from cart, and cart count updates 	|
| TC_CART_03  | Update Later        	| 	|

#### **10. *Test Automation Tools***
- **Framework:** Playwright dan/atau Selenium
- **Languages:** JavaScript (Node.js) atau Python (PyTest)
- **Continuous Integration (CI) Tool:** GitHub Actions
- **Test Report Generation:** ***To be decided later***

#### **11. *Test Criteria***
- **Entry Criteria:**
  - Test Environment, Test Data, dan Test Automation Tools telah disiapkan.
  - Aplikasi telah di-deploy dan dalam posisi *staged & stable*.
  - Test Case telah dibuat dan direview.

- **Exit Criteria:**
  - Seluruh Test Case prioritas tinggi telah dieksekusi.
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

