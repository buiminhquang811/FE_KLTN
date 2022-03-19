import React from 'react'
import {isAdminAuthenticated} from "../../../helpers/authUtils";
import { useHistory } from 'react-router-dom';

export default function AdminPage() {
  const history = useHistory();
  React.useEffect(() => {
    const isAdmin = isAdminAuthenticated();
    if (isAdmin) {
      history.push(`/admin/product`);
    }
  }, []);
  
  return (
    <div>
      this is body admin
    </div>
  )
}
