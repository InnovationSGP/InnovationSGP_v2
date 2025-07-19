"use client";

import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-900 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </div>
    );
};

export default Loading;
