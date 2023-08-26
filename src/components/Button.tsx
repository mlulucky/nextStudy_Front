import { CSSProperties } from "react";

type ButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "none";
  style?: CSSProperties;
};

export default function Button({
  children,
  onClick = () => {}, // 기본값 설정
  variant = "primary",
  style = {},
}: ButtonProps) {
  const styles = {
    primary: {
      width: "100%",
      borderRadius: "6px",
      border: "solid 1px rgba(0,0,0,.15)",
      backgroundColor: "#03c75a",
      padding: "13px 0 13px",
      fontSize: "20px",
      fontWeight: "700",
      lineHeight: "24px",
      color: "#fff",
      cursor: "pointer",
      marginTop: "40px",
    },
    none: {},
  }[variant];

  return (
    <button
      style={{ ...styles, ...style }}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}
