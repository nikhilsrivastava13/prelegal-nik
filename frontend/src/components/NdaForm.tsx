"use client";

import { NdaFormData } from "@/lib/nda-template";

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-700 mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none";

function PartySection({
  title,
  prefix,
  data,
  update,
}: {
  title: string;
  prefix: "party1" | "party2";
  data: NdaFormData;
  update: (fields: Partial<NdaFormData>) => void;
}) {
  const nameKey = `${prefix}Name` as keyof NdaFormData;
  const titleKey = `${prefix}Title` as keyof NdaFormData;
  const companyKey = `${prefix}Company` as keyof NdaFormData;
  const addressKey = `${prefix}Address` as keyof NdaFormData;
  const dateKey = `${prefix}Date` as keyof NdaFormData;

  return (
    <section>
      <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
        {title}
      </h3>
      <div className="space-y-4">
        <Field label="Print Name" htmlFor={`${prefix}-name`}>
          <input
            id={`${prefix}-name`}
            type="text"
            className={inputClass}
            value={data[nameKey]}
            onChange={(e) => update({ [nameKey]: e.target.value })}
          />
        </Field>
        <Field label="Title" htmlFor={`${prefix}-title`}>
          <input
            id={`${prefix}-title`}
            type="text"
            className={inputClass}
            value={data[titleKey]}
            onChange={(e) => update({ [titleKey]: e.target.value })}
          />
        </Field>
        <Field label="Company" htmlFor={`${prefix}-company`}>
          <input
            id={`${prefix}-company`}
            type="text"
            className={inputClass}
            value={data[companyKey]}
            onChange={(e) => update({ [companyKey]: e.target.value })}
          />
        </Field>
        <Field label="Notice Address (email or postal)" htmlFor={`${prefix}-address`}>
          <input
            id={`${prefix}-address`}
            type="text"
            className={inputClass}
            value={data[addressKey]}
            onChange={(e) => update({ [addressKey]: e.target.value })}
          />
        </Field>
        <Field label="Date" htmlFor={`${prefix}-date`}>
          <input
            id={`${prefix}-date`}
            type="date"
            className={inputClass}
            value={data[dateKey]}
            onChange={(e) => update({ [dateKey]: e.target.value })}
          />
        </Field>
      </div>
    </section>
  );
}

export default function NdaForm({ data, onChange }: NdaFormProps) {
  function update(fields: Partial<NdaFormData>) {
    onChange({ ...data, ...fields });
  }

  return (
    <div className="space-y-8">
      {/* Agreement Terms */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b border-slate-200 pb-2">
          Agreement Terms
        </h3>
        <div className="space-y-4">
          <Field label="Purpose" htmlFor="purpose">
            <textarea
              id="purpose"
              className={inputClass + " resize-none"}
              rows={2}
              value={data.purpose}
              onChange={(e) => update({ purpose: e.target.value })}
            />
          </Field>

          <Field label="Effective Date" htmlFor="effectiveDate">
            <input
              id="effectiveDate"
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => update({ effectiveDate: e.target.value })}
            />
          </Field>

          <Field label="MNDA Term">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "expires"}
                  onChange={() => update({ mndaTermType: "expires" })}
                  className="text-indigo-600"
                />
                Expires after
                <input
                  type="number"
                  min="1"
                  max="10"
                  aria-label="MNDA term years"
                  className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm text-center"
                  value={data.mndaTermYears}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || (Number(v) >= 1 && Number(v) <= 10)) {
                      update({ mndaTermYears: v });
                    }
                  }}
                  disabled={data.mndaTermType !== "expires"}
                />
                year(s) from Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={data.mndaTermType === "continues"}
                  onChange={() => update({ mndaTermType: "continues" })}
                  className="text-indigo-600"
                />
                Continues until terminated
              </label>
            </div>
          </Field>

          <Field label="Term of Confidentiality">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() =>
                    update({ confidentialityTermType: "years" })
                  }
                  className="text-indigo-600"
                />
                <input
                  type="number"
                  min="1"
                  max="10"
                  aria-label="Confidentiality term years"
                  className="w-16 rounded-md border border-slate-300 px-2 py-1 text-sm text-center"
                  value={data.confidentialityTermYears}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "" || (Number(v) >= 1 && Number(v) <= 10)) {
                      update({ confidentialityTermYears: v });
                    }
                  }}
                  disabled={data.confidentialityTermType !== "years"}
                />
                year(s) (trade secrets protected longer)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() =>
                    update({ confidentialityTermType: "perpetuity" })
                  }
                  className="text-indigo-600"
                />
                In perpetuity
              </label>
            </div>
          </Field>

          <Field label="Governing Law (State)" htmlFor="governingLaw">
            <input
              id="governingLaw"
              type="text"
              className={inputClass}
              placeholder="e.g. Delaware"
              value={data.governingLaw}
              onChange={(e) => update({ governingLaw: e.target.value })}
            />
          </Field>

          <Field label="Jurisdiction" htmlFor="jurisdiction">
            <input
              id="jurisdiction"
              type="text"
              className={inputClass}
              placeholder='e.g. courts located in New Castle, DE'
              value={data.jurisdiction}
              onChange={(e) => update({ jurisdiction: e.target.value })}
            />
          </Field>

          <Field label="MNDA Modifications (optional)" htmlFor="modifications">
            <textarea
              id="modifications"
              className={inputClass + " resize-none"}
              rows={2}
              placeholder="List any modifications to the standard terms..."
              value={data.modifications}
              onChange={(e) => update({ modifications: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <PartySection title="Party 1" prefix="party1" data={data} update={update} />
      <PartySection title="Party 2" prefix="party2" data={data} update={update} />
    </div>
  );
}
