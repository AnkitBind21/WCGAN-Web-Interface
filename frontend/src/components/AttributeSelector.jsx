import { Users, Smile } from "lucide-react";

const genderOptions = [
  { value: "male", label: "Male", icon: "♂" },
  { value: "female", label: "Female", icon: "♀" },
];

const smileOptions = [
  { value: true, label: "Smiling", icon: "😊" },
  { value: false, label: "Neutral", icon: "😐" },
];

export default function AttributeSelector({ gender, smile, onGenderChange, onSmileChange }) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">Gender</span>
        </div>
        <div className="flex gap-2">
          {genderOptions.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => onGenderChange(value)}
              className={`btn-option flex-1 flex items-center justify-center gap-2 ${
                gender === value ? "active" : ""
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <Smile className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">Expression</span>
        </div>
        <div className="flex gap-2">
          {smileOptions.map(({ value, label, icon }) => (
            <button
              key={String(value)}
              onClick={() => onSmileChange(value)}
              className={`btn-option flex-1 flex items-center justify-center gap-2 ${
                smile === value ? "active" : ""
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}