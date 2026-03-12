function ContactSection() {
  return (
    <section id="contact" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium text-blue-600">Contact</p>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Hubungi kami</h2>
          <p className="mb-8 text-base text-gray-600">
            Placeholder untuk section kontak. Nanti bisa diisi form, email, atau
            informasi bisnis lainnya.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm text-gray-700">Email: hello@example.com</p>
          <p className="mt-2 text-sm text-gray-700">Phone: +62 812-3456-7890</p>
          <p className="mt-2 text-sm text-gray-700">Address: Placeholder address</p>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
