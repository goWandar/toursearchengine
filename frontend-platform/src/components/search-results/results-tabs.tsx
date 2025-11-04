"use client";

import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/recipes/tabs/tabs";
import { Button } from "@/recipes/button/button";
import ParksTabContent from "./parks-tab-content";
import AllTabContent from "./all-tab-content";
import { useToursStore } from "@/stores/useTourStore";
import { addActiveTabHelper } from "@/utils/mordern-search.utils";

interface ResultsTabsProps {
    isLoading: boolean;
    searchItemType: string;
    searchItemName: string;
    searchItemId: number;
    searchParams: URLSearchParams;
    router: any;
    setSearchItemType: (type: string) => void;
    setSearchItemId: (id: number) => void;
}

export default function ResultsTabs({
    searchItemType,
    searchItemName,
    searchItemId,
    searchParams,
    router,
    setSearchItemId,
    setSearchItemType,
}: ResultsTabsProps) {
    const [activeTab, setActiveTab] = useState<"all" | "parks" | "experiences">("all");
    const typeInURL = searchParams?.get("type") ?? "";

    // Tours Store
    const { pagination } = useToursStore();

    // Check URL params on mount to set active results tab
    useEffect(() => {
        const tabFromUrl = searchParams.get("tab");
        if (tabFromUrl === "parks" && searchItemType === "country") {
            setActiveTab("parks");
        } else if (tabFromUrl === "experiences") {
            setActiveTab("experiences");
        } else {
            setActiveTab("all");
        }
    }, []);

    // Add active tab to URL whenever it changes(is applied)
    useEffect(() => {
        addActiveTabHelper({ activeTab, searchParams, router })
    }, [activeTab]);



    return (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "parks" | "experiences")} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border relative">
                {/* All Results tab */}
                <TabsTrigger value="all" asChild>
                    <div className="rounded-xl font-medium relative">
                        All Results {(activeTab === "all" && pagination.total > 0) && `(${pagination.total})`}
                        {activeTab === "all" && (
                            <Button
                                size="sm"
                                variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                title="View helpful insights"
                            >
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </TabsTrigger>

                {/* Parks tab */}
                {typeInURL === "country" && (
                    <TabsTrigger value="parks" className="rounded-xl font-medium relative">
                        Parks {(activeTab === "parks" && pagination.total > 0) && `(${pagination.total})`}
                        {activeTab === "parks" && (
                            <Button size="sm" variant="ghost"
                                className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded-full shadow-sm"
                                title="View park insights">
                                <Lightbulb className="h-4 w-4" />
                            </Button>
                        )}
                    </TabsTrigger>
                )}

                {/* Experiences tab */}
                <TabsTrigger value="experiences" className="rounded-xl font-medium relative">
                    Experiences {(activeTab === "experiences" && pagination.total > 0) && `(${pagination.total})`}
                    {activeTab === "experiences" && (
                        <Button size="sm" variant="ghost"
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full shadow-sm"
                            title="View experience insights">
                            <Lightbulb className="h-4 w-4" />
                        </Button>
                    )}
                </TabsTrigger>
            </TabsList>

            {/* All Tours Tab Content */}
            <TabsContent value="all" className="space-y-12">
                <AllTabContent searchParams={searchParams} searchItemId={searchItemId} searchItemType={searchItemType}
                    setSearchItemId={setSearchItemId} setSearchItemType={setSearchItemType}
                />
            </TabsContent>

            {/* Parks Tab Content */}
            <TabsContent value="parks" className="space-y-12">
                {/* Parks */}
                <ParksTabContent countryName={searchItemName} setSearchItemId={setSearchItemId}
                    setSearchItemType={setSearchItemType}
                />
            </TabsContent>
        </Tabs>
    );
}
