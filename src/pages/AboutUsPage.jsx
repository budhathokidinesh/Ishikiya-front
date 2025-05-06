import React from "react";

const AboutUsPage = () => {
  return (
    <div className="pt-[16vh] pb-12 bg-white text-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">
          About Us
        </h1>
        <p className="text-lg mb-6 text-center">
          Welcome to <strong>Alkimos Beach Fish & Chips</strong> – a local
          favourite where quality seafood meets warm community spirit.
        </p>

        <div className="space-y-6">
          <p>
            Nestled in the heart of Alkimos, our family-owned shop has been
            serving delicious, freshly prepared seafood since the beginning. We
            take pride in offering a variety of dishes, from classic fish and
            chips to our popular seafood sides—all made fresh to order.
          </p>

          <p>
            Whether you're craving golden Hake, crispy Snapper, or locally
            sourced Shark and Red Emperor, we've got something for everyone.
            Prefer grilled or crumbed? Want a little Cajun or lemon pepper kick?
            Just ask!
          </p>

          <h2 className="text-2xl font-semibold text-red-500">
            Why Locals Love Us:
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Fresh Ingredients:</strong> Locally sourced and freshly
              prepared.
            </li>
            <li>
              <strong>Generous Portions:</strong> No one leaves hungry!
            </li>
            <li>
              <strong>Family Friendly:</strong> Great for quick dinners or beach
              day takeaways.
            </li>
            <li>
              <strong>Fast & Friendly Service:</strong> Order in-store or call
              ahead!
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-500">Visit Us</h2>
          <p>
            📍 <strong>Shop 17/17 Turnstone Street, Alkimos WA 6038</strong>
            <br />
            📞 <strong>0451 308 488</strong>
            <br />
            🕓 <strong>Open Tuesday to Sunday | 4:00PM – 8:00PM</strong>
          </p>

          <p className="text-center mt-8 text-red-600 font-medium">
            Come for the fish, stay for the flavour. Follow us on Facebook for
            updates and specials!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
