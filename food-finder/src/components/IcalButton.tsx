"use client";

import { CopyToClipboard } from "react-copy-to-clipboard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

const IcalButton = () => {
    const [copied, setCopied] = useState(false);
    const iCalLink = "https://free-cwru-food.404wolf.com/api/events/calendar?minRating=2";

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(iCalLink);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <CopyToClipboard text={iCalLink} onCopy={handleCopy}>
            <Tooltip
                title={copied ? "iCal link copied to clipboard!" : "Copy iCal link to clipboard"}
            >
                <IconButton>
                    {copied ? <FileCopyIcon  style={{ color: "white" }}  /> : <CalendarTodayIcon style={{ color: "white" }} />}
                </IconButton>
            </Tooltip>
        </CopyToClipboard>
    );
};

export default IcalButton;
