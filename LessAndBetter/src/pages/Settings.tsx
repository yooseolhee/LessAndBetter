import { signOut } from "firebase/auth";
import Layout from "../components/layout/Layout";
import AccountDangerZone from "../components/settings/AccountDangerZone";
import { auth } from "../firebase";

export default function Settings() {

  return (
    <div>
      <h1 className="ml-30 text-3xl font-bold mb-10">Settings</h1>

      <div className="mx-30 flex flex-col items-center">
      <AccountDangerZone />
      </div>
  
    </div>
  );
}
