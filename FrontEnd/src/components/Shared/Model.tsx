"use client";

export default function Model({
  shouldShow,
  onRequestClose,
  children,
}: {
  children: React.ReactNode;
  shouldShow: boolean;
  onRequestClose: () => void;
}) {
  return (
    <>
      {shouldShow && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 w-full h-full overflow-auto "
          onClick={onRequestClose}   
        >
          <div
            className="bg-white my-[10%]  w-full max-w-md mx-auto p-6 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="closeModal"
              onClick={onRequestClose}
              className="text-white text-right w-full"
            >
              close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
