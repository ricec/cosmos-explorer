import { Stack } from "@fluentui/react";
import { QueryCopilotProps } from "Explorer/QueryCopilot/Shared/QueryCopilotInterfaces";
import { ExplanationButton } from "Explorer/QueryCopilot/V2/Bubbles/Explanation/Button/ExplanationButton";
import { ExplanationBubble } from "Explorer/QueryCopilot/V2/Bubbles/Explanation/ExplainationBubble";
import { OutputBubble } from "Explorer/QueryCopilot/V2/Bubbles/Output/OutputBubble";
import { RetrievingBubble } from "Explorer/QueryCopilot/V2/Bubbles/Retriveing/RetrievingBubble";
import { SampleBubble } from "Explorer/QueryCopilot/V2/Bubbles/Sample/SampleBubble";
import { WelcomeBubble } from "Explorer/QueryCopilot/V2/Bubbles/Welcome/WelcomeBubble";
import { Footer } from "Explorer/QueryCopilot/V2/Footer/Footer";
import { Header } from "Explorer/QueryCopilot/V2/Header/Header";
import { useQueryCopilot } from "hooks/useQueryCopilot";
import React from "react";
import { WelcomeSidebarModal } from "../Modal/WelcomeSidebarModal";

export const QueryCopilotSidebar: React.FC<QueryCopilotProps> = ({ explorer }: QueryCopilotProps): JSX.Element => {
  const {
    setWasCopilotUsed,
    showCopilotSidebar,
    chatMessages,
    isGeneratingQuery,
    showWelcomeSidebar,
  } = useQueryCopilot();

  React.useEffect(() => {
    if (showCopilotSidebar) {
      setWasCopilotUsed(true);
    }
  }, []);

  return (
    <Stack style={{ width: "100%", height: "100%", backgroundColor: "#FAFAFA" }}>
      <Header />
      {showWelcomeSidebar ? (
        <WelcomeSidebarModal />
      ) : (
        <>
          <Stack
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <WelcomeBubble />
            {chatMessages.map((message, index) => {
              switch (message.source) {
                case 0:
                  return (
                    <Stack
                      key={index}
                      horizontalAlign="center"
                      tokens={{ padding: 8, childrenGap: 8 }}
                      style={{
                        backgroundColor: "#E0E7FF",
                        borderRadius: "8px",
                        margin: "5px 10px",
                        textAlign: "start",
                      }}
                    >
                      {message.message}
                    </Stack>
                  );
                case 1:
                  return <OutputBubble key={index} copilotMessage={message} />;
                case 2:
                  return <ExplanationBubble key={index} copilotMessage={message} />;
                default:
                  return <></>;
              }
            })}
            <RetrievingBubble />
            <ExplanationButton />

            {chatMessages.length === 0 && !isGeneratingQuery && <SampleBubble />}
          </Stack>
          <Footer explorer={explorer} />
        </>
      )}
    </Stack>
  );
};
