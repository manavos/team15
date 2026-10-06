import Navbar from "@/components/Navbar";
import MenuItemForm from "@/components/MenuItemForm";

export default function AdminPage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>Add Menu Item</h1>
        <MenuItemForm />
      </main>
    </div>
  );
}
