function Navbar() {
  const today = new Date().toDateString();

  return (
    <div className="text-center mb-4">
      <h2 className="fw-bold">Training Dashboard</h2>
      <p>{today}</p>
    </div>
  );
}

export default Navbar;