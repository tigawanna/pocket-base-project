import React from 'react'


interface UndoModalProps {
undoRemove: () => void;
countdown:number;
}

export const UndoModal: React.FC<UndoModalProps> = ({undoRemove,countdown}) => {
const undoClicked=()=>{
        undoRemove()
      }
   return (
        <div className="w-full h-full flex justify-center items-center z-50">
        <div className="p-[5px]" 
        onClick={() => undoClicked()}>
            UNDO: {countdown / 1000}
          </div>
        </div>
      );
}
