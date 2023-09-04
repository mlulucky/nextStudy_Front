import PageWrapper from "@/styles/PageWrapper";
import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/router";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import userStore from "@/store/userStore";
import Loading from "@/components/Loading";
import { useCookies } from "react-cookie";
import Text from "@/styles/JoinText";

export default function Login() {
  const router = useRouter();
  const { userCheck } = useAuth();
  const { user } = userStore();
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    if (user) {
      // 로그인 후에 로그인정보가 있는지 확인 후 없으면 login 페이지로 이동
      userCheck().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }

  // 로그인 후 "/" url 접근시 todolist 페이지로 이동
  if (user) {
    router.push("/todolist");
    return null;
  }

  // 브라우저 껏다켜도, 로그인한 상태이면 todolist 페이지로 이동
  if (cookies.name) {
    router.push("/todolist");
    return null;
  }

  return (
    <PageWrapper>
      <LoginForm />
      <Text
        onClick={() => {
          router.push("/join");
        }}
      >
        아직 회원이 아니신가요? 회원가입
      </Text>
    </PageWrapper>
  );
}
