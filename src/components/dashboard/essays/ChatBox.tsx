import styled from "styled-components";
import Image from "next/image";
import images from "@/constants/images.json";

const Box = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70vh;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.div`
  font-family: var(--font-fredoka);
  font-weight: 600;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.textPrimary};
`;

const Description = styled.div`
  color: #222;
  font-size: 1rem;
  margin-bottom: 2rem;
  font-weight: 500;
`;

const Input = styled.textarea`
  border: 1.5px solid #222;
  border-radius: 1rem;
  padding: 1rem;
  width: 100%;
  min-height: 48px;
  font-size: 1rem;
  margin-top: auto;
  resize: none;
  box-sizing: border-box;
`;

export default function ChatBox() {
  return (
    <Box>
      <div>
        <Header>
          <Image src={images["tori"]} alt="Tori" width={48} height={48} />
          <Title>ChatTori</Title>
        </Header>
        <Description>
          Hi there! I'm Tori, your writing assistant.<br />
          Here's your first draft — feel free to make changes or ask me anything.
        </Description>
      </div>
      <Input placeholder="Ask, Build Something..." />
    </Box>
  );
} 