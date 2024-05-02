import DashboardLayout from '@/component/Dashboard/DashboardLayout'
import Layout from '@/component/Layout'
import { getSession } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div>
        <Layout>
            <DashboardLayout />
        </Layout>
    </div>
  )
}

export default DashboardPage;

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: { session },
    };
}