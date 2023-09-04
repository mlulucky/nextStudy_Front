import React, { useEffect, useState } from "react";
import ToDoTemplate from "@/components/ToDoTemplate";
import PageWrapper from "@/styles/PageWrapper";
import NavPageLayout from "@/components/NavPageLayout";
import useAuth from "@/hooks/useAuth";
import userStore from "@/store/userStore";
import Loading from "@/components/Loading";

const ToDoListPage = () => {
  const { userInfo, userCheck } = useAuth();
  const { user, setUser } = userStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userCheck().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }

  return (
    <>
      {user && (
        <NavPageLayout>
          <PageWrapper>
            <ToDoTemplate></ToDoTemplate>
          </PageWrapper>
        </NavPageLayout>
      )}
    </>
  );
};

export default ToDoListPage;
