import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="home-page">
      <Navbar />

      <section className="title">
        <h1>Welcome to KRISPI!</h1>
        <p>KRISPI is a Cafe opened in 2026 that sells a select variety of drinks and appetizers!</p>
      </section>

      <section>
        <h2 className="title">Featured Menu</h2>

        <div className="food-grid">
          <div className="menu-item">
            <img
              className="menu-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSElCE5KLmyJYaq6Vg9ygcOFOp5mMOFLaiBUzCjmmFtqg&s=10"
              alt="Popcorn Chicken"
            />
            <h3>Popcorn Chicken</h3>
            <p>Savory chunks of crispy chicken with fragrant fried Thai basil, and sauce.</p>
            <span>$8.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://www.momontimeout.com/wp-content/uploads/2024/05/peach-green-tea-square.jpeg"
              alt="Peach Tea"
            />
            <h3>Peach Lychee Fruit Tea</h3>
            <p>Perfectly sweet, made with ripe peaches and topped with small lychee bits.</p>
            <span>$5.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqAMHgwNHUEX-gjjlJOVmFeVI2QedglEv7j2ivTxkmrg&s=10"
              alt="Matcha"
            />
            <h3>Iced Matcha Latte</h3>
            <p>Full of energy and rich in taste.</p>
            <span>$5.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5AoLaXlIWtKjY-SOyMGbLpbDb_dY98jn8T5T3JbuCFp9VNkqxolTJ4wMU&s=10"
              alt="Boba"
            />
            <h3>Brown Sugar Boba Milk Tea</h3>
            <p>Sugary sweetness topped with tapioca pearls.</p>
            <span>$5.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://asassyspoon.com/wp-content/uploads/cafe-cubano-cuban-coffee-recipe-a-sassy-spoon-4.jpg"
              alt="Coffee"
            />
            <h3>Signature Coffee</h3>
            <p>KRISPI signature coffee blend.</p>
            <span>$2.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://wildwildwhisk.com/wp-content/uploads/2018/04/How-to-make-Croissant-baked-2.jpg"
              alt="Croissant"
            />
            <h3>Croissant</h3>
            <p>Delicious puff pastry.</p>
            <span>$2.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://kirbiecravings.com/wp-content/uploads/2016/09/mochi-ice-cream-033.jpg"
              alt="Mochi"
            />
            <h3>Mochi</h3>
            <p>Traditional rice cake with an ice cream filling.</p>
            <span>$1.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://i0.wp.com/simplybeautifuleating.com/wp-content/uploads/2024/04/8DDC2C3A-2627-44AB-A3AB-D2DB356BA7A62015-06-02_17-58-00_010-2023-11-09T15_19_31.176-1.jpeg?resize=1290%2C1613&ssl=1"
              alt="Donuts"
            />
            <h3>Donuts</h3>
            <p>Choose from a wide selection of our freshly made donuts.</p>
            <span>$1.99</span>
          </div>

          <div className="menu-item">
            <img
              className="menu-image"
              src="https://www.3yummytummies.com/wp-content/uploads/2015/09/Strawberry-Cream-Chocolate-Crepes-f.jpg"
              alt="Chocolate Strawberry Crepe"
            />
            <h3>Chocolate Strawberry Crepe</h3>
            <p>Sweet chocolate and strawberry crepe.</p>
            <span>$5.99</span>
          </div>
        </div>
      </section>
    </main>
  );
}
