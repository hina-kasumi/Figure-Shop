import { ReactNode } from "react";
import { IconType } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";

interface InfoBoxProps {
  title: string;
  items: ItemType[];
  type: "commit" | "notice";
}

interface ItemType {
  icon?: IconType;
  text: ReactNode;
}

export default function InfoBox({ title, items, type }: InfoBoxProps) {
  const isCommit = type === "commit";

  return (
    <div className="border border-green-500 rounded-md bg-white shadow-sm p-4">
      <h2 className="text-green-600 font-semibold mb-3 uppercase">{title}</h2>
      <ul className="space-y-2 text-gray-700 text-sm">
        {items.map((item, idx) => {
          const ItemIcon: IconType =
            isCommit && item.icon ? item.icon : FaExclamationCircle;
          return (
            <li key={idx} className="flex items-start gap-2">
              <ItemIcon className="text-green-500 mt-0.5" />
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
