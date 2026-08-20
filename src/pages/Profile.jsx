import { useState } from "react";
import { Trash2, MapPin, User as UserIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { authAPI } from "../services/api.js";

const emptyAddress = {
  label: "Home",
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  isDefault: false,
};

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [profileForm, setProfileForm] = useState({ name: user.name, phone: user.phone || "" });
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [addressForm, setAddressForm] = useState(emptyAddress);
  const [addressError, setAddressError] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setSavingProfile(true);
    try {
      const { data } = await authAPI.updateProfile(profileForm);
      updateUser(data.user);
      setProfileMsg("Profile updated successfully.");
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressError("");
    const required = ["fullName", "phone", "addressLine1", "city", "state", "postalCode"];
    const missing = required.filter((f) => !addressForm[f].trim());
    if (missing.length > 0) {
      setAddressError("Please fill in all required address fields.");
      return;
    }
    setSavingAddress(true);
    try {
      const { data } = await authAPI.addAddress(addressForm);
      updateUser({ ...user, addresses: data.addresses });
      setAddressForm(emptyAddress);
      setShowAddressForm(false);
    } catch (err) {
      setAddressError(err.message);
    } finally {
      setSavingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const { data } = await authAPI.deleteAddress(addressId);
      updateUser({ ...user, addresses: data.addresses });
    } catch (err) {
      setAddressError(err.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60, maxWidth: 760 }}>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">
        <UserIcon size={20} style={{ verticalAlign: -3, marginRight: 8 }} />
        My Account
      </h1>

      <section className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 className="mb-3">Personal Information</h3>
        {profileMsg && <p className="badge badge-success mb-3">{profileMsg}</p>}
        {profileError && <p className="form-error mb-3">{profileError}</p>}
        <form onSubmit={handleProfileSave}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              value={profileForm.name}
              onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" value={user.email} disabled />
            <p className="form-hint">Email cannot be changed.</p>
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={profileForm.phone}
              onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={savingProfile}>
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      <section className="card" style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-3">
          <h3><MapPin size={17} style={{ verticalAlign: -2, marginRight: 6 }} />Saved Addresses</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setShowAddressForm((s) => !s)}>
            {showAddressForm ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {addressError && <p className="form-error mb-3">{addressError}</p>}

        {showAddressForm && (
          <form onSubmit={handleAddAddress} className="mb-4" style={{ background: "var(--color-bg)", padding: 16, borderRadius: 10 }}>
            <div className="address-form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={addressForm.fullName} onChange={(e) => setAddressForm((f) => ({ ...f, fullName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={addressForm.phone} onChange={(e) => setAddressForm((f) => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Address Line 1</label>
                <input className="form-input" value={addressForm.addressLine1} onChange={(e) => setAddressForm((f) => ({ ...f, addressLine1: e.target.value }))} />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Address Line 2 (optional)</label>
                <input className="form-input" value={addressForm.addressLine2} onChange={(e) => setAddressForm((f) => ({ ...f, addressLine2: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input className="form-input" value={addressForm.city} onChange={(e) => setAddressForm((f) => ({ ...f, city: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input className="form-input" value={addressForm.state} onChange={(e) => setAddressForm((f) => ({ ...f, state: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input className="form-input" value={addressForm.postalCode} onChange={(e) => setAddressForm((f) => ({ ...f, postalCode: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Label</label>
                <select className="form-select" value={addressForm.label} onChange={(e) => setAddressForm((f) => ({ ...f, label: e.target.value }))}>
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={savingAddress}>
              {savingAddress ? "Saving..." : "Save Address"}
            </button>
          </form>
        )}

        {user.addresses?.length === 0 ? (
          <p className="text-muted">No saved addresses yet.</p>
        ) : (
          <div className="address-list">
            {user.addresses.map((addr) => (
              <div key={addr._id} className="address-item">
                <div>
                  <span className="badge badge-teal">{addr.label}</span>
                  {addr.isDefault && <span className="badge badge-success" style={{ marginLeft: 6 }}>Default</span>}
                  <p className="mt-2" style={{ fontWeight: 600 }}>{addr.fullName} — {addr.phone}</p>
                  <p className="text-muted">
                    {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}, {addr.state} {addr.postalCode}
                  </p>
                </div>
                <button className="btn-icon-danger" onClick={() => handleDeleteAddress(addr._id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
