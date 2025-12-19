import { useState } from "react";
import { Funnel, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toogle, filterStatus } from "../../feature/InvoiceSlice";

const status = ["all", "pending", "paid", "draft"];

function Header() {
  const [show, setShow] = useState("false");
  const dispatch = useDispatch();

  const { invoices, filter } = useSelector((state) => state.invoices);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleShowItem = (item) => {
    dispatch(filterStatus(item));
    setShow((prev) => !prev);
  };

  const handleNewForm = () => {
    dispatch(toogle());
  };

 

  return (
    <>
      <header className="w-3/5 flex items-start justify-between py-10 text-white">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl capitalize tracking-wider font-bold">
            Invoices
          </h2>
          <p className="text-base capitalize text-slate-400">
            {invoices.length
              ? `there are ${invoices.length} total invoices`
              : "No invoices"}
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="w-fit relative">
            <button
              className="flex items-center justify-center gap-2 cursor-pointer border-none outline-none hover:text-slate-400 transition-all duration-200 ease-in-out"
              onClick={handleShow}
            >
              <Funnel className="size-7" />
              <span className="text-lg capitalize font-semibold">
                filter by status
              </span>
            </button>
            <ul
              className={`w-full absolute top-10 text-start rounded-xs bg-teal-800  transition-all duration-300 ease-linear ${
                show ? "hidden  translate-y-2.5" : "visible translate-y-0"
              }`}
            >
              {status?.map((item) => {
                return (
                  <li
                    key={item}
                    className={`${
                      filter === item ? "text-teal-400" : null
                    } text-base capitalize p-3 px-5 cursor-pointer font-semibold hover:bg-white/30 transition-all duration-200 ease-in-out`}
                    onClick={() => handleShowItem(item)}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <button
              className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 active:scale-105 gap-2 py-1.5 px-5 rounded-4xl cursor-pointer border-none outline-none transition-all duration-200 ease-in-out"
              onClick={handleNewForm}
            >
              <div className="p-2 bg-white rounded-full flex items-center justify-center">
                <Plus className="size-5 text-emerald-600" />
              </div>
              <span className="text-base capitalize">new invoice</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
