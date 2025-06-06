# 📘 NestJS Learning – Key Concepts & Takeaways

 **NestJS**. Below are the core topics I explored and implemented, explained briefly from a beginner's perspective.

---

## 🧱 Core NestJS Concepts

### 🧩 Module
> A logical unit that groups related components (controllers, services, etc.) together. It helps in organizing code into reusable blocks.

### ⚙️ Service
> Contains the core business logic. Services are injected into controllers and handle operations like DB access or calculations.

### 📡 Controller
> Handles incoming HTTP requests and delegates work to the appropriate service methods.

---

## 🛣️ Routing

### 🔢 Positional Routing
> Routing that includes dynamic URL parameters like `:id`. Used for accessing specific items via URL.

**Example:**
```ts
@Get(':id')
getBook(@Param('id') id: string) {
  return this.bookService.findOne(id);
}


