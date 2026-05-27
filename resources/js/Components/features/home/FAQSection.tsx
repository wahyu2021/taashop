import { FAQData } from '@/types';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import EmptyState from '@/Components/shared/EmptyState';

interface Props {
    faqs: FAQData[];
}

export default function FAQSection({ faqs }: Props) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <HelpCircle size={14} />
                            Bantuan & Dukungan
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-black text-stone-900 uppercase tracking-tighter leading-tight mb-8">
                            Pertanyaan yang <br /> Sering <span className="text-orange-600">Diajukan</span>
                        </h2>
                        <p className="text-stone-500 text-lg leading-relaxed max-w-md">
                            Kami telah merangkum beberapa hal yang sering ditanyakan untuk membantu Anda memahami layanan kami lebih baik.
                        </p>
                    </div>

                    <div className="bg-stone-50 p-8 sm:p-12 border border-stone-100">
                        {faqs.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full space-y-4">
                                {faqs.map((faq) => (
                                    <AccordionItem 
                                        key={faq.id} 
                                        value={`item-${faq.id}`}
                                        className="border-b border-stone-200 last:border-none"
                                    >
                                        <AccordionTrigger className="text-left font-black uppercase tracking-tight text-stone-900 hover:text-orange-600 transition-colors py-4">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-stone-600 leading-relaxed text-sm pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <EmptyState 
                                title="FAQ Sedang Disiapkan"
                                message="Pusat bantuan kami sedang diperbarui dengan informasi terbaru. Silakan hubungi kami langsung jika ada pertanyaan mendesak."
                                icon={HelpCircle}
                                className="bg-white border-stone-100 border-none py-10"
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
