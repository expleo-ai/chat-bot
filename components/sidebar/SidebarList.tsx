import React from "react";
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import Button from '../buttons/Button';
import { ChatsList, NamespacesList, SourceDocumentsToggle, ModelTemperature } from './components/index';

interface SidebarListProps {
    createChat: () => string;
    selectedNamespace: string;
    returnSourceDocuements: boolean;
    setReturnSourceDocuments: React.Dispatch<React.SetStateAction<boolean>>;
    modelTemperature: number;
    setModelTemperature: React.Dispatch<React.SetStateAction<number>>;
    filteredChatList: string[];
    selectedChatId: string;
    setSelectedChatId: React.Dispatch<React.SetStateAction<string>>;
    nameSpaceHasChats: boolean;
    chatNames: Record<string, string>;
    updateChatName: (chatId: string, newName: string) => void;
    deleteChat: (chatId: string) => void;
    namespaces: string[];
    setSelectedNamespace: React.Dispatch<React.SetStateAction<string>>;
    isLoadingNamespaces: boolean;
}

const SidebarList: React.FC<SidebarListProps> = ({
    createChat,
    selectedNamespace,
    returnSourceDocuements,
    setReturnSourceDocuments,
    modelTemperature,
    setModelTemperature,
    filteredChatList,
    selectedChatId,
    setSelectedChatId,
    nameSpaceHasChats,
    chatNames,
    updateChatName,
    deleteChat,
    namespaces,
    setSelectedNamespace,
    isLoadingNamespaces,
}) => {
    return (
        <nav className="flex flex-col h-full">
            <div className="px-4 space-y-3 mb-4">
                <SourceDocumentsToggle
                    checked={returnSourceDocuements}
                    setReturnSourceDocuments={setReturnSourceDocuments}
                />
                <ModelTemperature
                    modelTemperature={modelTemperature}
                    setModelTemperature={setModelTemperature}
                />
                <Button
                    buttonType="primary"
                    buttonText="New Chat"
                    onClick={async () => {
                        const newChatId = createChat();
                        setSelectedChatId(newChatId);
                    }}
                    icon={PlusCircleIcon}
                />
            </div>

            <>
                <div className="px-4 w-full space-y-2 mb-6">
                    <div className="text-xs sm:text-sm font-semibold leading-6 text-blue-400">
                        Your namespaces
                    </div>
                    <NamespacesList
                        isLoadingNamespaces={isLoadingNamespaces}
                        namespaces={namespaces}
                        selectedNamespace={selectedNamespace}
                        setSelectedNamespace={setSelectedNamespace}
                    />
                </div>

                <div className="px-4 text-xs sm:text-sm font-semibold leading-6 text-blue-400">
                    Your Chats
                </div>

                <div className="px-4 flex-grow overflow-y-auto">
                    {selectedNamespace && nameSpaceHasChats ? (
                        <ChatsList
                            filteredChatList={filteredChatList}
                            selectedChatId={selectedChatId}
                            setSelectedChatId={setSelectedChatId}
                            chatNames={chatNames}
                            updateChatName={updateChatName}
                            deleteChat={deleteChat}
                        />
                    ) : (
                        <div>
                            {selectedNamespace ? 'No Chats in this namespace' : 'Select a Namespace to display Chats'}
                        </div>
                    )}
                </div>
            </>
        </nav>
    );
};

export default SidebarList;