"use client";

import { FormEvent, useState } from "react";
import { CATEGORIES, MenuItemErrors, MenuItemField, validateMenuItem } from "@/lib/validateMenuItem";

interface FormValues {
  name: string;
  description: string;
  price: string;
  category: string;
  available: boolean;
  imageUrl: string;
}

const emptyForm: FormValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  available: true,
  imageUrl: "",
};

const errorStyle = { color: "#c0392b", fontSize: "0.875rem", margin: "0.25rem 0 0" };
const fieldStyle = { display: "flex", flexDirection: "column" as const, marginBottom: "1rem" };
const inputStyle = (hasError: boolean) => ({
  padding: "0.5rem",
  border: `1px solid ${hasError ? "#c0392b" : "#ccc"}`,
  borderRadius: "4px",
});

export default function MenuItemForm() {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<MenuItemErrors>({});
  const [touched, setTouched] = useState<Partial<Record<MenuItemField, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    setStatus(null);
    // Once a field has been visited, keep its error message in sync as the user types
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateMenuItem(next)[field] }));
    }
  };

  const handleBlur = (field: MenuItemField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateMenuItem(values)[field] }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const validationErrors = validateMenuItem(values);
    if (Object.keys(validationErrors).length > 0) {
      // Block submission: show every error and don't call the API
      setErrors(validationErrors);
      setTouched({ name: true, description: true, price: true, category: true, available: true, imageUrl: true });
      setStatus({ type: "error", message: "Please fix the highlighted fields before submitting." });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, price: Number(values.price) }),
      });
      const json = await res.json();

      if (!res.ok) {
        // Show server-side validation errors inline, the same way as client-side ones
        setErrors(json.errors ?? {});
        setStatus({ type: "error", message: json.message ?? "Could not save the menu item." });
        return;
      }

      setValues(emptyForm);
      setErrors({});
      setTouched({});
      setStatus({ type: "success", message: `"${json.item.name}" was added to the menu.` });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: "480px" }}>
      <div style={fieldStyle}>
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          style={inputStyle(!!errors.name)}
        />
        {errors.name && (
          <p id="name-error" role="alert" style={errorStyle}>
            {errors.name}
          </p>
        )}
      </div>

      <div style={fieldStyle}>
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          required
          rows={3}
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
          style={inputStyle(!!errors.description)}
        />
        {errors.description && (
          <p id="description-error" role="alert" style={errorStyle}>
            {errors.description}
          </p>
        )}
      </div>

      <div style={fieldStyle}>
        <label htmlFor="price">Price ($) *</label>
        {/* type="text" + inputMode so non-numeric input like "abc" reaches our validator instead of being silently dropped */}
        <input
          id="price"
          type="text"
          inputMode="decimal"
          required
          placeholder="e.g. 5.50"
          value={values.price}
          onChange={(e) => updateField("price", e.target.value)}
          onBlur={() => handleBlur("price")}
          aria-invalid={!!errors.price}
          aria-describedby={errors.price ? "price-error" : undefined}
          style={inputStyle(!!errors.price)}
        />
        {errors.price && (
          <p id="price-error" role="alert" style={errorStyle}>
            {errors.price}
          </p>
        )}
      </div>

      <div style={fieldStyle}>
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          required
          value={values.category}
          onChange={(e) => updateField("category", e.target.value)}
          onBlur={() => handleBlur("category")}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? "category-error" : undefined}
          style={inputStyle(!!errors.category)}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" role="alert" style={errorStyle}>
            {errors.category}
          </p>
        )}
      </div>

      <div style={fieldStyle}>
        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input
          id="imageUrl"
          type="url"
          placeholder="https://..."
          value={values.imageUrl}
          onChange={(e) => updateField("imageUrl", e.target.value)}
          onBlur={() => handleBlur("imageUrl")}
          aria-invalid={!!errors.imageUrl}
          aria-describedby={errors.imageUrl ? "imageUrl-error" : undefined}
          style={inputStyle(!!errors.imageUrl)}
        />
        {errors.imageUrl && (
          <p id="imageUrl-error" role="alert" style={errorStyle}>
            {errors.imageUrl}
          </p>
        )}
      </div>

      <div style={{ ...fieldStyle, flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
        <input
          id="available"
          type="checkbox"
          checked={values.available}
          onChange={(e) => updateField("available", e.target.checked)}
        />
        <label htmlFor="available">Available</label>
      </div>

      {status && (
        <p role="status" style={{ color: status.type === "success" ? "#1e8449" : "#c0392b", marginBottom: "1rem" }}>
          {status.message}
        </p>
      )}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Add menu item"}
      </button>
    </form>
  );
}
