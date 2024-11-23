import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - LudoLex',
  description: 'Discover and explore your favorite video games',
}

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">
          Welcome to LudoLex
        </h1>
        <p className="text-text-secondary">
          Your comprehensive source for video game information
        </p>
      </section>

      {/* Featured Games Section - Placeholder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Featured Games
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO */}
        </div>
      </section>

      {/* Recent Reviews Section - Placeholder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Recent Reviews
        </h2>
        <div className="grid gap-6">
            {/* TODO */}
        </div>
      </section>
        <section className="text-2xl font-semibold text-text-primary m-20">
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, asperiores commodi cum cupiditate
                dignissimos esse fugiat iste magnam modi odio, placeat praesentium, recusandae. Ad odio, perspiciatis
                repellendus soluta vero voluptates?
            </div>
            <div>Alias architecto asperiores autem cumque ea eaque earum, eius eligendi harum in inventore laborum magni
                necessitatibus numquam omnis perspiciatis quibusdam quisquam tenetur! At id ipsam maxime mollitia
                placeat quia rerum!
            </div>
            <div>At blanditiis doloremque dolores, earum esse eum eveniet harum hic illo illum modi nam omnis porro
                soluta tenetur vel veritatis? Blanditiis eum fugit itaque perferendis possimus reprehenderit rerum vero
                voluptas.
            </div>
            <div>Ab accusamus alias est ipsa porro praesentium quod repudiandae rerum. Ab adipisci blanditiis cum
                distinctio eligendi fuga id, nam pariatur quas quisquam, reprehenderit sit vel voluptatibus? Cupiditate
                eveniet veniam veritatis?
            </div>
            <div>Animi, excepturi, unde. Aut esse expedita, facilis harum illum inventore officia quod. Accusantium
                aspernatur at, beatae cum dolores, facere fugit inventore laudantium minus nisi perspiciatis, quia
                quisquam repellat similique velit.
            </div>
            <div>A ab, accusamus alias blanditiis distinctio dolorum eligendi facilis fugit harum impedit in inventore
                itaque iusto magni minus nam necessitatibus non omnis quibusdam sint sunt voluptas voluptate
                voluptatibus. Dolore, vero.
            </div>
            <div>Dicta in magni nobis nulla perspiciatis placeat, provident, quibusdam quisquam reprehenderit
                repudiandae saepe sint temporibus totam unde ut! Asperiores consequatur cumque deserunt doloremque
                molestias necessitatibus nemo quod voluptate? Ea, impedit.
            </div>
            <div>At blanditiis consequatur debitis deserunt distinctio dolor dolorum ducimus eos expedita illo inventore
                iure laborum libero necessitatibus, odio officiis possimus quae quam quidem sint vel veniam voluptas
                voluptates. Iste, quam?
            </div>
            <div>A aliquam consectetur culpa deleniti deserunt distinctio eius eligendi, facilis in iste quasi quod quos
                sapiente ullam voluptatibus. At hic labore minus nostrum omnis perferendis perspiciatis quo soluta sunt
                voluptatem.
            </div>
            <div>Accusamus aliquid architecto consequuntur corporis culpa doloribus earum eligendi error ex facere
                fugiat hic ipsam minus modi mollitia numquam odio quam qui quod, recusandae reiciendis sed similique
                suscipit velit voluptatibus?
            </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at blanditiis, cupiditate deserunt
                    dolores iste labore maiores minus nesciunt nulla quis quisquam quo, ratione reprehenderit sit ullam
                    voluptatibus. Provident, quasi?</div>
                <div>Perspiciatis quos totam ut? Accusantium culpa, debitis eum illum iure labore laborum modi nobis
                    obcaecati perferendis perspiciatis porro quae quasi quis quo sit tempore ut vero voluptas
                    voluptatem! Consequatur, necessitatibus.
                </div>
                <div>Et mollitia quis tempore! A atque aut consequatur dolores et illum, neque non nulla odit officiis
                    optio quae qui quisquam recusandae rem, tempore voluptate. Doloremque dolorum earum et fugiat
                    soluta!
                </div>
                <div>A animi consequatur debitis deleniti distinctio eos, ex facilis fugit iusto numquam, perferendis
                    quasi quo velit. Ad animi ducimus eos est, eum ex facilis, harum nemo quibusdam sunt tempore ullam.
                </div>
                <div>Labore, nam, nemo! Amet culpa deserunt esse et id, itaque magni modi molestias natus, nobis nostrum
                    odio officia pariatur placeat quae quo sed sint sit voluptate voluptates? Facere, nobis temporibus!
                </div>
                <div>Accusantium aliquam aliquid architecto assumenda autem dolorem doloribus eaque eius enim est
                    excepturi hic iste, magnam maiores mollitia non nulla officia praesentium quaerat quas, saepe
                    temporibus, totam voluptas voluptates voluptatibus.
                </div>
                <div>Ab, adipisci amet aut delectus dolorum ducimus earum enim exercitationem explicabo facere fugiat
                    impedit in ipsa ipsam, labore maxime natus nemo numquam officia praesentium quod reiciendis soluta
                    tempore totam ut?
                </div>
                <div>Aperiam architecto dolorem magnam nulla, praesentium tempore! A aperiam, consectetur doloribus eius
                    error fugiat, incidunt ipsum iure magnam neque odit, officia quod vero! Aut eum incidunt obcaecati,
                    quam sed sequi.
                </div>
                <div>Debitis deserunt impedit qui? A corporis eos eveniet excepturi facere itaque maxime nam nisi, porro
                    quam quasi temporibus voluptate, voluptatum! Ducimus et iure sequi voluptates! Autem ipsa officiis
                    voluptate voluptatibus.
                </div>
                <div>Accusantium consequuntur cumque debitis deleniti ipsa laudantium, magni, maxime officia porro quae,
                    quaerat quas qui quia? Consectetur cumque deleniti explicabo fuga iste neque obcaecati omnis placeat
                    quam quisquam, soluta, ullam?
                </div>
            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam commodi consequuntur
                culpa dignissimos in ipsam ipsum mollitia, nihil nostrum nulla odit qui, recusandae repellat tempora vel
                vero. Excepturi, laborum.
            </div>
            <div>A aliquid cupiditate distinctio enim facere ipsa iste nostrum perspiciatis, placeat ratione sint
                tenetur ut veritatis voluptas voluptatem. Consequatur corporis delectus dignissimos dolorem maxime
                quaerat, ratione voluptates! Enim, facere, quasi?
            </div>
            <div>Accusantium ad, alias animi at dignissimos ducimus et, eum harum itaque maxime mollitia necessitatibus
                nesciunt soluta temporibus voluptatem. Debitis dolorem enim iste obcaecati odit pariatur possimus qui
                quibusdam recusandae sit?
            </div>
            <div>Assumenda consectetur, dolores iure quam reprehenderit sequi unde. Ab beatae eligendi et facere fugiat
                harum id in ipsa, nulla odio optio perspiciatis possimus quaerat quo ratione recusandae sunt, unde
                vitae.
            </div>
            <div>Accusamus animi asperiores assumenda consequatur dolore, dolores doloribus ducimus eos esse eum eveniet
                expedita fuga illo laudantium magni nobis odio porro, quam quidem reiciendis rem saepe suscipit tempora
                totam, voluptates.
            </div>
            <div>Deleniti, hic illo incidunt mollitia quod repudiandae temporibus! Alias animi minima ullam. A
                aspernatur atque autem dolorum fuga fugit rem ullam voluptates. Iure maiores pariatur, possimus
                praesentium provident quibusdam repellat!
            </div>
            <div>Aliquam asperiores distinctio dolore dolores expedita iste laborum, libero maiores nemo quisquam
                reprehenderit tempora, totam voluptas! Accusantium assumenda atque consequuntur culpa enim fugit id
                molestias nulla officia, repellat tenetur veniam.
            </div>
            <div>Aliquam asperiores consequatur consequuntur, culpa deleniti deserunt dolores enim eos excepturi
                expedita facere hic ipsum molestiae molestias mollitia necessitatibus nobis officia optio perspiciatis
                possimus quae qui sit ullam velit voluptatem?
            </div>
            <div>Aspernatur, autem doloribus, eligendi error fuga fugit iste laboriosam modi molestias neque omnis quas
                repellat sint, soluta ullam vero voluptates. Consequuntur delectus dicta dolorum nisi quas quasi
                quisquam sequi sunt.
            </div>
            <div>Accusantium aperiam beatae culpa, distinctio dolorem doloremque et eveniet exercitationem facilis
                fugiat inventore iste laudantium minus mollitia omnis optio placeat, qui quo quos repudiandae sapiente
                sed sequi soluta tenetur ullam!
            </div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur eaque facere id ipsam itaque
                    molestias, nihil perferendis voluptas! Animi dignissimos error magnam necessitatibus nobis, nostrum
                    odit pariatur placeat quibusdam quisquam!</div>
                <div>Accusantium adipisci aperiam at illum inventore iure libero nobis perferendis quae, voluptatum!
                    Aliquam dolore pariatur placeat recusandae sint voluptate voluptatum? Corporis culpa cumque fugiat
                    id laborum nulla, porro praesentium vel?
                </div>
                <div>A commodi cum doloribus error obcaecati sequi similique, vero. Facilis fugiat illo, in nemo
                    praesentium vero? Cumque earum et nobis voluptatem. A aliquam dolores neque officiis rem repudiandae
                    soluta totam.
                </div>
                <div>Ad enim fuga inventore iure laudantium quibusdam quo quod veritatis! Ad distinctio magnam
                    perferendis sit vitae. Aut, ea est iusto maiores necessitatibus possimus quo sint tempore tenetur
                    vero. Excepturi, fuga.
                </div>
                <div>Eius, exercitationem tenetur! Blanditiis cum cumque deleniti eligendi est molestias placeat, quis
                    reiciendis sed tempora. Aperiam cupiditate delectus earum laboriosam neque nulla ullam vero.
                    Necessitatibus quibusdam quidem quod repellendus similique!
                </div>
                <div>A blanditiis deserunt dignissimos dolorem eius eos est eum, illo impedit maiores maxime optio
                    provident reprehenderit saepe sint sit temporibus vero voluptas. Alias aperiam blanditiis illum
                    inventore magni recusandae, tenetur.
                </div>
                <div>At blanditiis consequuntur harum reiciendis, tempora totam. Commodi dolor ea, eveniet ipsa qui
                    reprehenderit tenetur vitae? Adipisci consectetur dicta ducimus eum ex libero magnam molestiae
                    pariatur, quibusdam quos tempora veritatis.
                </div>
                <div>Accusamus animi assumenda, atque corporis cupiditate debitis ex exercitationem facilis incidunt,
                    ipsa ipsam labore maxime nemo nostrum odit, porro quam qui recusandae reiciendis suscipit tempore
                    unde ut voluptas. Et, officiis.
                </div>
                <div>Atque commodi debitis distinctio esse hic illo minima natus, nesciunt nostrum possimus rem
                    temporibus, vel vitae! Alias amet ducimus eius ex illum laudantium non quae repellendus tempore
                    veritatis! Aperiam, sequi.
                </div>
                <div>Accusamus alias beatae, eaque iste itaque maxime ratione! Asperiores assumenda ea error est et modi
                    nobis quasi rerum similique veritatis? Architecto at facilis, maiores odit perferendis provident
                    sapiente velit voluptate!
                </div>
        </section>
    </div>
  )
}
