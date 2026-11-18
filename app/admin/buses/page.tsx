
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Bus as BusIcon, Plus, Pencil, Trash2, X, RefreshCw, ArrowLeft } from "lucide-react";

interface Bus {
  bus_id: number;
  bus_code: string;
  bus_number: string;
  bus_type: string;
  bus_capacity: number;
  role?: string;
  created_at?: string;
}

interface BusForm {
  bus_code: string;
  bus_number: string;
  bus_type: string;
  bus_capacity: number;

}

const initialForm: BusForm = {
  bus_code: "",
  bus_number: "",
  bus_type: "",
  bus_capacity: 0,

};

export default function BusManagementPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [form, setForm] = useState<BusForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busToDelete, setBusToDelete] = useState<Bus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchBuses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiClient<Bus[]>("/bus", { method: "GET", requiresAuth: true });
      setBuses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load buses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.bus_capacity <= 0) {
      setError("Bus capacity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingId !== null) {
        await apiClient<Bus>(`/bus/${editingId}`, {
          method: "PUT",
          requiresAuth: true,
          body: JSON.stringify(form),
        });
      } else {
        await apiClient<Bus>("/bus", {
  method: "POST",
  requiresAuth: true,
  body: JSON.stringify(form),
});
      }

      setForm(initialForm);
      setEditingId(null);
      setShowForm(false);
      await fetchBuses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save bus.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (bus: Bus) => {
    setForm({
      bus_code: bus.bus_code,
      bus_number: bus.bus_number,
      bus_type: bus.bus_type,
      bus_capacity: bus.bus_capacity,
     
    });
    setEditingId(bus.bus_id);
    setShowForm(true);
    setError("");
  };

  const handleDelete = async () => {
    if (!busToDelete) return;

    try {
      setDeleting(true);
      setError("");

      await apiClient<boolean>(`/bus/${busToDelete.bus_id}`, {
        method: "DELETE",
        requiresAuth: true,
      });

      setBusToDelete(null);
      await fetchBuses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete bus.");
    } finally {
      setDeleting(false);
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#F5F0E6] p-4 text-[#174D3A] sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div  className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><button
  onClick={() => window.location.href = "/admin"}
  className="mb-4 flex w-fit items-center gap-2 rounded-lg border border-[#D9E2D9] bg-white px-4 py-2 text-sm font-semibold text-[#174D3A] transition-colors hover:bg-[#E8F0E9]"
>
  <ArrowLeft size={17} />

</button>
            <p className="text-sm font-medium text-[#4C8479]">ADMINISTRATION</p>
            <h1 className="mt-1 text-3xl font-bold">Bus Management</h1>
            <p className="mt-2 text-sm text-[#64746B]">Manage your buses and their information.</p>
          </div>

          <div className="flex gap-2">
            <button onClick={fetchBuses} className="flex items-center gap-2 rounded-lg border border-[#D9E2D9] bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[#E8F0E9]">
              <RefreshCw size={17} /> Refresh
            </button>
            <button onClick={() => { setForm(initialForm); setEditingId(null); setShowForm(true); setError(""); }} className="flex items-center gap-2 rounded-lg bg-[#174D3A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#24664E]">
              <Plus size={18} /> Add Bus
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#D9E2D9] bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64746B]">Total Buses</p>
                <p className="mt-2 text-3xl font-bold">{buses.length}</p>
              </div>
              <div className="rounded-xl bg-[#E8F0E9] p-3 text-[#174D3A]">
                <BusIcon size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#D9E2D9] bg-white p-5">
            <p className="text-sm text-[#64746B]">Available Bus Types</p>
            <p className="mt-2 text-3xl font-bold">{new Set(buses.map((bus) => bus.bus_type)).size}</p>
          </div>
        </div>

        {showForm && (
          <section className="rounded-xl border border-[#D9E2D9] bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId !== null ? "Edit Bus" : "Add New Bus"}</h2>
              <button onClick={handleCancel} className="rounded-lg p-2 hover:bg-[#E8F0E9]" aria-label="Close form">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Bus Code</label>
                <input required value={form.bus_code} onChange={(e) => setForm({ ...form, bus_code: e.target.value })} placeholder="Example: BUS-001" className="w-full rounded-lg border border-[#D9E2D9] px-3 py-2.5 outline-none focus:border-[#4C8479]" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Bus Number</label>
                <input required value={form.bus_number} onChange={(e) => setForm({ ...form, bus_number: e.target.value })} placeholder="Example: 1234" className="w-full rounded-lg border border-[#D9E2D9] px-3 py-2.5 outline-none focus:border-[#4C8479]" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Bus Type</label>
                <input required value={form.bus_type} onChange={(e) => setForm({ ...form, bus_type: e.target.value })} placeholder="Example: Air-conditioned" className="w-full rounded-lg border border-[#D9E2D9] px-3 py-2.5 outline-none focus:border-[#4C8479]" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Bus Capacity</label>
                <input required min="1" type="number" value={form.bus_capacity || ""} onChange={(e) => setForm({ ...form, bus_capacity: Number(e.target.value) })} placeholder="Example: 45" className="w-full rounded-lg border border-[#D9E2D9] px-3 py-2.5 outline-none focus:border-[#4C8479]" />
              </div>

              <div className="flex justify-end gap-2 sm:col-span-2">
                <button type="button" onClick={handleCancel} className="rounded-lg border border-[#D9E2D9] px-5 py-2.5 text-sm font-semibold hover:bg-[#F5F0E6]">
                  Cancel
                </button>
                <button disabled={saving} type="submit" className="rounded-lg bg-[#174D3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#24664E] disabled:opacity-60">
                  {saving ? "Saving..." : editingId !== null ? "Update Bus" : "Save Bus"}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="overflow-hidden rounded-xl border border-[#D9E2D9] bg-white">
          <div className="border-b border-[#D9E2D9] p-5">
            <h2 className="text-lg font-bold">Bus List</h2>
            <p className="mt-1 text-sm text-[#64746B]">View, edit, and delete registered buses.</p>
          </div>

          {loading ? (
            <div className="p-10 text-center text-sm text-[#64746B]">Loading buses...</div>
          ) : buses.length === 0 ? (
            <div className="p-10 text-center">
              <BusIcon className="mx-auto mb-3 text-[#4C8479]" size={35} />
              <p className="font-semibold">No buses found</p>
              <p className="mt-1 text-sm text-[#64746B]">Click Add Bus to register your first bus.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-[#E8F0E9] text-[#174D3A]">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Bus Code</th>
                    <th className="px-5 py-3 font-semibold">Bus Number</th>
                    <th className="px-5 py-3 font-semibold">Bus Type</th>
                    <th className="px-5 py-3 font-semibold">Capacity</th>
                    <th className="px-5 py-3 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E2D9]">
                  {buses.map((bus) => (
                    <tr key={bus.bus_id} className="hover:bg-[#F8FAF7]">
                      <td className="px-5 py-4 font-semibold">{bus.bus_code}</td>
                      <td className="px-5 py-4">{bus.bus_number}</td>
                      <td className="px-5 py-4">{bus.bus_type}</td>
                      <td className="px-5 py-4">{bus.bus_capacity} seats</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(bus)} className="rounded-lg bg-[#E8F0E9] p-2 text-[#174D3A] hover:bg-[#D9E8DC]" title="Edit bus">
                            <Pencil size={17} />
                          </button>
                          <button onClick={() => setBusToDelete(bus)} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100" title="Delete bus">
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {busToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Trash2 size={26} />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold text-[#174D3A]">Confirm Delete</h2>
              <p className="mt-2 text-sm text-[#64746B]">
                Are you sure you want to delete this bus?
              </p>
              
            </div>

            <div className="mt-6 flex gap-3">
              <button
                disabled={deleting}
                onClick={() => setBusToDelete(null)}
                className="flex-1 rounded-lg border border-[#D9E2D9] px-4 py-2.5 text-sm font-semibold text-[#174D3A] hover:bg-[#F5F0E6] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={handleDelete}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
