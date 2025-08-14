// src/HandoutsPage.jsx
import { HANDOUTS } from "../data/handouts";

export default function HandoutsPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patient Handouts</h2>
      <p className="mb-4">
        Download easy-to-read IDDSI sheets for families and patients.  
        Source:{" "}
        <a
          href="https://www.iddsi.org/resources/patient-handouts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          IDDSI
        </a>{" "}
        (CC BY-SA 4.0)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {HANDOUTS.map((item, index) => (
          <a
            key={`${item.level}-${item.title}-${index}`}
            href={`/assets/handouts/${item.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border rounded-lg hover:shadow-md transition bg-white"
          >
            <h3 className="font-semibold">
              Level {item.level} – {item.title}
            </h3>
            <p className="mt-1 text-sm text-blue-600 underline">Open PDF</p>
          </a>
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-500">
        These PDF handouts are adapted from IDDSI patient/caregiver materials under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          CC BY-SA 4.0 license
        </a>.
      </p>
    </div>
  );
}
